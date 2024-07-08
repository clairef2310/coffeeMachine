export class Eau {
    public quantite: number;
    static Plein: Eau = new Eau(1);
    static Vide: Eau = new Eau(0);

    getQuantite() : number {
        return this.quantite;
    }

    private constructor(quantite: number) {
        this.quantite = quantite;
    }

    EstInférieureA(comparée: Eau) {
        return this.quantite < comparée.quantite;
    }

    public toString(){
        return this.quantite.toString() + 'ml';
    }

    static Parse(quantite: number) {
        switch (quantite) {
            case 1000:
                return Eau.Plein
            case 0:
                return Eau.Vide
            default:
                throw new Error()
        }
    }

}