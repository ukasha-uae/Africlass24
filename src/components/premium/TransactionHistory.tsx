'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  History, 
  Coins, 
  Crown, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Filter,
  Download,
  Calendar
} from 'lucide-react';
import { getUserTransactions, getTransactionStats, filterTransactions, Transaction, TransactionType, TransactionStatus } from '@/lib/transaction-history';
import { formatGHS } from '@/lib/payments';
import { format } from 'date-fns';

interface TransactionHistoryProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

export default function TransactionHistory({ open, onClose, userId }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState(getTransactionStats(userId));
  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<TransactionStatus | 'all'>('all');

  useEffect(() => {
    if (open) {
      const userTransactions = getUserTransactions(userId);
      setTransactions(userTransactions);
      setFilteredTransactions(userTransactions);
      setStats(getTransactionStats(userId));
    }
  }, [open, userId]);

  useEffect(() => {
    let filtered = transactions;
    
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(t => t.status === filterStatus);
    }
    
    // Sort by timestamp (newest first)
    filtered = filtered.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    setFilteredTransactions(filtered);
  }, [transactions, filterType, filterStatus]);

  const getStatusBadge = (status: TransactionStatus) => {
    const variants: Record<TransactionStatus, { variant: 'default' | 'secondary' | 'destructive' | 'outline', icon: React.ReactNode }> = {
      completed: { variant: 'default', icon: <CheckCircle2 className="h-3 w-3 mr-1" /> },
      failed: { variant: 'destructive', icon: <XCircle className="h-3 w-3 mr-1" /> },
      pending: { variant: 'outline', icon: <Clock className="h-3 w-3 mr-1" /> },
      processing: { variant: 'secondary', icon: <Clock className="h-3 w-3 mr-1" /> },
      cancelled: { variant: 'outline', icon: <XCircle className="h-3 w-3 mr-1" /> },
      refunded: { variant: 'secondary', icon: <Download className="h-3 w-3 mr-1" /> },
    };
    
    const config = variants[status] || variants.pending;
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTypeIcon = (type: TransactionType) => {
    switch (type) {
      case 'coin_purchase':
        return <Coins className="h-4 w-4 text-yellow-600" />;
      case 'subscription':
        return <Crown className="h-4 w-4 text-amber-600" />;
      case 'refund':
        return <Download className="h-4 w-4 text-red-600" />;
      default:
        return <History className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            Transaction History
          </DialogTitle>
          <DialogDescription>
            View all your purchases and subscriptions
          </DialogDescription>
        </DialogHeader>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Spent</p>
              <p className="text-xl font-bold text-green-700 dark:text-green-400">
                {formatGHS(stats.totalSpent)}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Transactions</p>
              <p className="text-xl font-bold text-blue-700 dark:text-blue-400">
                {stats.totalTransactions}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold">Type:</span>
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('all')}
              className="h-7 text-xs"
            >
              All
            </Button>
            <Button
              variant={filterType === 'coin_purchase' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('coin_purchase')}
              className="h-7 text-xs"
            >
              Coins
            </Button>
            <Button
              variant={filterType === 'subscription' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('subscription')}
              className="h-7 text-xs"
            >
              Subscriptions
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Status:</span>
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('all')}
              className="h-7 text-xs"
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('completed')}
              className="h-7 text-xs"
            >
              Completed
            </Button>
            <Button
              variant={filterStatus === 'failed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('failed')}
              className="h-7 text-xs"
            >
              Failed
            </Button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-2">
          {filteredTransactions.length === 0 ? (
            <Card className="p-8 text-center">
              <History className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No transactions found</p>
            </Card>
          ) : (
            filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-full bg-primary/10">
                        {getTypeIcon(transaction.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm">{transaction.description}</p>
                          {getStatusBadge(transaction.status)}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(transaction.timestamp), 'MMM dd, yyyy HH:mm')}
                          </span>
                          {transaction.metadata.coins && (
                            <span className="flex items-center gap-1">
                              <Coins className="h-3 w-3 text-yellow-600" />
                              {transaction.metadata.coins} coins
                            </span>
                          )}
                        </div>
                        {transaction.transactionId && (
                          <p className="text-xs text-muted-foreground mt-1">
                            ID: {transaction.transactionId}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{formatGHS(transaction.amount)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

