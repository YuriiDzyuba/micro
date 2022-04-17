export abstract class LetterCreatorInterfaces {
    protected userId: string;
    protected to: string;
    protected subject: string;
    protected html: string;
    protected userName: string;
    protected from?: string;

    abstract getLetter(): Omit<LetterCreatorInterfaces, 'getLetter'>;
}