export interface HardwareInterface
    extends ChangeMachineInterface,
        CupProviderInterface,
        ButtonPanelInterface,
        BrewerInterface {
}

export interface BrewerInterface {
    /**
     * Demande à la machine de faire couler un café.
     * Si aucune dose d'eau n'était préchargée dans le bouilleur, la machine tentera d'en charger une
     * @return True si aucun problème, False si défaillance
     */
    MakeACoffee(): boolean

    /**
     * Tire une dose d'eau depuis le réservoir vers le bouilleur
     * @return True si une dose a été tirée avec succès
     * @return False si le bouilleur contenait déjà une dose d'eau
     * @return False si aucune dose complète n'a pu être tirée
     */
    TryPullWater(): boolean

    /**
     * Ajoute une dose de lait au mélange.
     * Il est conseillé d'ajouter le lait en premier, sauf sur le capuccino.
     * @return True si aucun problème, False si défaillance
     */
    PourMilk(): boolean

    /**
     * Ajoute une dose d'eau au mélange. Il est conseillé d'ajouter l'eau en dernier.
     * Si aucune dose d'eau n'était dans le bouilleur, la machine tentera d'en charger une
     * @return True si aucun problème, False si défaillance
     */
    PourWater(): boolean

    /**
     * Ajoute une dose de sucre au mélange. Il est conseillé d'ajouter le sucre en premier.
     * @return True si aucun problème, False si défaillance
     */
    PourSugar(): boolean

    /**
     * Ajoute une dose de chocolat au mélange. Il est conseillé d'ajouter le chocolat
     * après le sucre mais avant les autre ingrédients.
     * @return True si aucun problème, False si défaillance
     */
    PourChocolate(): boolean
}

export interface CupProviderInterface {
    /**
     * Renvoie l'état du capteur de présence d'une tasse
     * @return True si une tasse est présente
     * @return False si une tasse est absente
     */
    IsCupPresent(): boolean

    /**
     * Relâche un gobelet, s'il en reste. Il est conseillé de vérifier IsCupPresent ensuite.
     */
    ProvideCup(): void
}

export interface ButtonPanelInterface {
    /**
     * Enregistre un callback appelé lors de l'appui sur un bouton de la façade avant
     * @param callback prend un unique paramètre qui contiendra l'ID du bouton pressé
     */
    RegisterButtonPressedCallback(callback: (buttonCode: ButtonCodes) => void): void;

    /**
     * Allume ou éteint la LED informant de l'impossibilité d'avoir un allongé
     * @param state le nouvel état de la LED
     */
    SetLungoWarningLedState(state: boolean): void;
}

export enum ButtonCodes {
    BTN_LUNGO = 0,
    BTN_SUGAR_PLUS = 1,
    BTN_SUGAR_MINUS = 4,
    BTN_LATTE = 2,
    BTN_CHOCOLATE_WATER = 5,
    BTN_CHOCOLATE_MILK= 6,
    BTN_CAPUCCINO = 7,
    BTN_MAINTENANCE_RESET = 3
}

export enum CoinCodes {
    ONE_CENT = 1,
    TWO_CENTS = 2,
    FIVE_CENTS = 5,
    TEN_CENTS = 10,
    TWENTY_CENTS = 20,
    FIFTY_CENTS = 50,
    ONE_EURO = 100,
    TWO_EUROS = 200,
}

export interface ChangeMachineInterface {
    /**
     * Enregistre un callback, qui sera appelé lors de l'insertion d'une pièce reconnue valide
     * Attention : si le monnayeur est physiquement plein (plus de 5 pièces), cette méthode n'est
     * plus invoquée. Il est de la responsabilité du logiciel de surveiller cela.
     * @param callback prend un unique paramètre où sera injecté la valeur de la pièce détectée
     */
    RegisterMoneyInsertedCallback(callback: (coinValue: CoinCodes) => void): void;

    /**
     * Vide le monnayeur et rend l'argent
     */
    FlushStoredMoney(): void;

    /**
     * Vide le monnayeur et encaisse l'argent
     */
    CollectStoredMoney(): void;

    /**
     * Fait tomber une pièce depuis le stock vers la trappe à monnaie
     * @param coin_code
     * @return True si la pièce était disponible
     * @return False si aucune pièce n'a pu être trouvée avec ce montant
     */
    DropCashback(coin_code: CoinCodes): boolean;
}