export class Café {
    public quantite: number;
    static Plein: Café = new Café(1);
    static Vide: Café = new Café(0);

    getQuantite() : number {
        return this.quantite;
    }

    private constructor(quantite: number) {
        this.quantite = quantite;
    }

    EstInférieureA(comparée: Café) {
        return this.quantite < comparée.quantite;
    }

    public toString(){
        return this.quantite.toString() + 'dose';
    }

    static Parse(quantite: number) {
        switch (quantite) {
            case 1000:
                return Café.Plein
            case 0:
                return Café.Vide
            default:
                throw new Error()
        }
    }

}