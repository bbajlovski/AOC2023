type Card = "A" | "K" | "Q" | "J" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2";
type Combination = "five-of-a-kind" | "four-of-a-kind" | "full-house" | "three-of-a-kind" | "two-pairs" | "one-pair" | "high-card";

export class Poker {
    private cardStrengths: Card[] = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
    private combinationStrengths: Combination[] = ["five-of-a-kind", "four-of-a-kind", "full-house", "three-of-a-kind", "two-pairs", "one-pair", "high-card"];    

    
}