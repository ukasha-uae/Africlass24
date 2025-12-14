'use client';

import { IntelligentLessonIntro } from '@/components/IntelligentLessonIntro';
import { Utensils, Milk, FlaskConical, Activity, Microscope, Heart } from 'lucide-react';

interface DigestionIntroProps {
  onComplete?: () => void;
}

export default function DigestionIntro({ onComplete }: DigestionIntroProps) {
  const scenes = [
    {
      id: 1,
      icon: Utensils,
      title: "Where Does Your Food Go?",
      narration: "Have you ever wondered what happens to your waakye or banku after you swallow it? How does that delicious fufu become energy for your body? The answer is digestion - an amazing nine-meter journey through your digestive system! From the moment food enters your mouth to when nutrients reach your blood, it's a non-stop adventure!",
      visualContent: "🍚 Food → 👄 Mouth → 🫁 Stomach → 🔬 Intestines → 💉 Blood → ⚡ Energy!",
      highlightWords: ['digestion', 'nine-meter', 'digestive system', 'nutrients', 'blood'],
      teacherTip: "Ask students to trace the path food takes - most are surprised by the length!"
    },
    {
      id: 2,
      icon: Milk,
      title: "Mechanical vs Chemical Digestion",
      narration: "There are two types of digestion working together. Mechanical digestion is physical - your teeth crushing fufu into smaller pieces, your stomach churning food like a washing machine. Chemical digestion uses enzymes - special proteins that break down large food molecules. Try this: chew bread for two minutes without swallowing. It becomes sweet! That's amylase enzyme turning starch into sugar!",
      visualContent: "🦷 Mechanical = Chewing, Churning | 🧪 Chemical = Enzymes breaking bonds",
      highlightWords: ['Mechanical', 'teeth', 'churning', 'Chemical', 'enzymes', 'amylase', 'sweet'],
      teacherTip: "Have students actually try the bread-chewing experiment - they'll taste the sweetness!"
    },
    {
      id: 3,
      icon: FlaskConical,
      title: "The Stomach - Acid Factory!",
      narration: "Your stomach is like a strong acid bath! Hydrochloric acid creates pH one point five - so acidic it could dissolve metal! This kills bacteria and activates pepsin to break down proteins. But why doesn't your stomach digest itself? A thick mucus layer protects it! When this layer is damaged by stress or bacteria, painful ulcers form. That's why skipping meals is dangerous!",
      visualContent: "🧪 HCl (pH 1.5) + Pepsin → Proteins broken to peptides | 🛡️ Mucus = Protection",
      highlightWords: ['Hydrochloric acid', 'pH', 'pepsin', 'proteins', 'mucus', 'ulcers'],
      teacherTip: "Explain why antacid medicines neutralize stomach acid to relieve heartburn."
    },
    {
      id: 4,
      icon: Microscope,
      title: "Small Intestine - Absorption Hero!",
      narration: "The small intestine is six meters long and covered with millions of finger-like projections called villi! These villi give it a surface area the size of a tennis court - that's two hundred fifty square meters inside you! Here, bile from your liver emulsifies fats, pancreatic enzymes complete digestion, and nutrients pass through thin walls into your blood. It's the most important organ for absorption!",
      visualContent: "🔬 Villi + Microvilli = 250 m² surface area | 🟢 Bile emulsifies fats | 🩸 Nutrients → Blood",
      highlightWords: ['villi', 'tennis court', 'two hundred fifty', 'bile', 'emulsifies', 'absorption'],
      teacherTip: "Use your fingers to demonstrate villi - they increase surface area dramatically!"
    },
    {
      id: 5,
      icon: Activity,
      title: "The Complete Enzyme Team",
      narration: "Meet the enzyme team! Amylase from your mouth and pancreas breaks starch to maltose, then maltase makes glucose. Pepsin and trypsin tackle proteins, breaking them to amino acids. Lipase handles fats, producing fatty acids and glycerol. Each enzyme has its perfect pH - amylase loves neutral, pepsin needs acid, while intestinal enzymes prefer slightly alkaline!",
      visualContent: "📊 Starch → Maltose → Glucose | Proteins → Peptides → Amino acids | Fats → Fatty acids + Glycerol",
      highlightWords: ['amylase', 'maltase', 'glucose', 'pepsin', 'trypsin', 'amino acids', 'lipase', 'fatty acids'],
      teacherTip: "Create a matching game - enzyme to substrate to product - for memorization."
    },
    {
      id: 6,
      icon: Heart,
      title: "Keep Your Digestive System Healthy!",
      narration: "Your digestive system works hard every day! Keep it healthy by eating fiber from kontomire and vegetables - fiber prevents constipation. Drink plenty of water. Avoid too much spicy food and alcohol that can damage your stomach lining. Many Ghanaians have lactose intolerance - they can't digest milk sugar - but fermented products like yogurt and fura are easier to digest. Listen to your body!",
      visualContent: "✅ Eat fiber | ✅ Drink water | ✅ Eat regularly | ❌ Skip meals | ❌ Too much alcohol",
      highlightWords: ['fiber', 'constipation', 'water', 'lactose intolerance', 'fermented', 'yogurt'],
      teacherTip: "Discuss local digestive health remedies and which ones have scientific basis."
    }
  ];

  return (
    <IntelligentLessonIntro
      lessonTitle="Digestion and the Human Digestive System"
      subject="Integrated Science"
      scenes={scenes}
      onComplete={onComplete}
    />
  );
}
