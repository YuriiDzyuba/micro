export abstract class LetterTemplateInterfaces {
    protected link: string;
    protected to: string;
    protected subject: string;
    protected html: string;
    protected userName: string;
    protected from?: string;

    abstract getLetter(): Omit<LetterTemplateInterfaces, 'getLetter'>;
}