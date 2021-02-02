
export interface Operation {
    codeTypeOperation: string;
    dateOperation: string;
    dateValeur: string;
    familleTypeOperation: string;
    fitid: string;
    idCarte: string;
    idCreancier: string;
    idDevise: string;
    indexCarte: number;
    libelleCash1: string;
    libelleCash2: string;
    libelleComplementaire: string;
    libelleDevise: string;
    libelleOperation: string;
    libelleTypeOperation: string;
    montant: number;
    pictogrammeCSS: string;
    referenceClient: string;
    referenceMandat: string;
    typeOperation: string;
}

export interface Montant {
  key: string;
  value: number;
}
