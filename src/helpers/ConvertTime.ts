export class ConvertTime {
  secondsToTime(input: number): string {
    const seconds = this.zeroFill(input % 60);
    const minutes = this.zeroFill(Math.floor(input / 60) % 60);
    const hours = this.zeroFill(Math.floor(input / 3600));
    return `${hours}:${minutes}:${seconds}`;
  }

  timeToSeconds(input: string): number {
    const time = input.split(':').map(item => parseInt(item));
    const seconds = time[0] * 3600 + time[1] * 60 + time[2];
    return seconds;
  }

  setsToTime(input: number): string {
    const minutes = this.zeroFill(input);
    return `00:${minutes}`;
  }

  timeToSets(input: string): number {
    const sets = parseInt(input.split(':')[1]);
    return sets;
  }

  private zeroFill(input: number): string {
    return input.toString().padStart(2, '0');
  }
}
