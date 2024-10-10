export function weatherToMood(condition: string): string {
    const lowercaseCondition = condition.toLowerCase();
    if (lowercaseCondition.includes('clear') || lowercaseCondition.includes('sunny')) {
      return 'happy';
    } else if (lowercaseCondition.includes('rain') || lowercaseCondition.includes('drizzle')) {
      return 'melancholy';
    } else if (lowercaseCondition.includes('snow')) {
      return 'chill';
    } else if (lowercaseCondition.includes('thunderstorm')) {
      return 'intense';
    } else {
      return 'neutral';
    }
  }