
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { Move, CheckCircle, XCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface DragItem {
    id: number;
    value: number;
}
interface DataRow {
    class: string;
    frequency: number;
}
const initialData: DataRow[] = [
    { class: '0-10', frequency: 5 },
    { class: '11-20', frequency: 7 },
    { class: '21-30', frequency: 12 },
    { class: '31-40', frequency: 6 },
];

export function CumulativeFrequencyTableActivity() {
    const isMobile = useIsMobile();
    const { toast } = useToast();
    const [draggedItem, setDraggedItem] = React.useState<DragItem | null>(null);

    const cumulativeFrequencies = React.useMemo(() => {
        let sum = 0;
        return initialData.map((d, i) => ({ id: i, value: sum += d.frequency }));
    }, []);

    const [availableItems, setAvailableItems] = React.useState<DragItem[]>(cumulativeFrequencies);
    const [slots, setSlots] = React.useState<Array<DragItem | null>>(Array(initialData.length).fill(null));
    const [isChecked, setIsChecked] = React.useState(false);

    const handleDragStart = (e: React.DragEvent, item: DragItem) => {
        setDraggedItem(item);
    };

    const handleDrop = (e: React.DragEvent, index: number) => {
        if (!draggedItem || slots[index]) return; // Don't drop if slot is filled

        const newSlots = [...slots];
        newSlots[index] = draggedItem;
        
        setSlots(newSlots);
        setAvailableItems(prev => prev.filter(i => i.id !== draggedItem.id));
        setDraggedItem(null);
        setIsChecked(false);
    };

     const handleSelectChange = (slotIndex: number, selectedValue: string) => {
        const valueNum = parseInt(selectedValue, 10);
        const selectedItem = cumulativeFrequencies.find(item => item.value === valueNum);
        
        if (selectedItem) {
            const newSlots = [...slots];
            newSlots[slotIndex] = selectedItem;
            setSlots(newSlots);
        }
        setIsChecked(false);
    };
    
    const handleReturnToPool = (e: React.DragEvent) => {
        if (draggedItem) {
            setSlots(prevSlots => prevSlots.map(slot => (slot && slot.id === draggedItem.id ? null : slot)));
            setAvailableItems(prev => {
                if (!prev.find(item => item.id === draggedItem.id)) {
                    return [...prev, draggedItem].sort((a, b) => a.id - b.id);
                }
                return prev;
            });
            setDraggedItem(null);
        }
    };

    const handleCheckAnswers = () => {
        setIsChecked(true);
        const allCorrect = slots.every((slot, index) => slot && slot.value === cumulativeFrequencies[index].value);
        if(allCorrect) {
            toast({ title: "Congratulations!", description: "All cumulative frequencies are correct.", className: "bg-green-100 text-green-800" });
        } else {
             toast({ title: "Almost There!", description: "Some values are incorrect. The wrong ones are marked in red.", variant: "destructive" });
        }
    };

    const handleReset = () => {
        setAvailableItems(cumulativeFrequencies);
        setSlots(Array(initialData.length).fill(null));
        setIsChecked(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const allSlotsFilled = slots.every(slot => slot !== null);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Activity 1: Build a Cumulative Frequency Table</CardTitle>
                <CardDescription>
                    {isMobile ? 'Select the correct cumulative frequency for each row.' : 'Drag the cumulative frequency values to their correct positions in the table.'}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {!isMobile && (
                    <div 
                        className="p-4 border border-dashed rounded-md min-h-[4rem] bg-muted/20 flex flex-wrap gap-2 items-center justify-center"
                        onDrop={handleReturnToPool}
                        onDragOver={handleDragOver}
                    >
                        {availableItems.map(item => (
                            <Badge
                                key={item.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, item)}
                                className="p-2 cursor-grab active:cursor-grabbing text-base"
                                variant="secondary"
                            >
                                {item.value}
                            </Badge>
                        ))}
                            {availableItems.length === 0 && <p className="text-sm text-muted-foreground">All values placed!</p>}
                    </div>
                )}

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Class Interval</TableHead>
                            <TableHead>Frequency</TableHead>
                            <TableHead>Cumulative Frequency</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialData.map((row, index) => {
                            const isSlotCorrect = isChecked && slots[index] && slots[index]?.value === cumulativeFrequencies[index].value;
                            const isSlotIncorrect = isChecked && slots[index] && !isSlotCorrect;

                            return (
                                <TableRow key={row.class}>
                                    <TableCell>{row.class}</TableCell>
                                    <TableCell>{row.frequency}</TableCell>
                                    <TableCell
                                        onDrop={(e) => handleDrop(e, index)}
                                        onDragOver={handleDragOver}
                                        className={cn(
                                            isMobile ? "p-2" : "border-dashed border-2 bg-muted/30",
                                            !isMobile && draggedItem && !slots[index] && "border-accent",
                                            isSlotCorrect && "border-green-500",
                                            isSlotIncorrect && "border-red-500"
                                        )}
                                    >
                                        {isMobile ? (
                                            <Select onValueChange={(value) => handleSelectChange(index, value)} value={slots[index]?.value.toString() || ''}>
                                                <SelectTrigger className={cn(
                                                    "w-full",
                                                    isChecked && (isSlotCorrect ? "border-green-500" : isSlotIncorrect ? "border-red-500" : "")
                                                )}>
                                                    <SelectValue placeholder="Select Value" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {cumulativeFrequencies.map(item => (
                                                        <SelectItem key={item.id} value={item.value.toString()}>{item.value}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        ) : slots[index] ? (
                                                <Badge className="p-2 text-base" variant="secondary">{slots[index]?.value}</Badge>
                                        ) : (
                                            <span className="text-muted-foreground text-xs">Drop here</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
             <CardFooter className="flex justify-between">
                <Button onClick={handleCheckAnswers} disabled={!allSlotsFilled || isChecked}>Check Answers</Button>
                <Button variant="outline" onClick={handleReset}>Reset</Button>
            </CardFooter>
        </Card>
    );
}

