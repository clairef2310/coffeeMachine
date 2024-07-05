export class Eau {
    private  quantite: number;

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

}