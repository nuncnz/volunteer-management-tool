declare global {
    interface Number {
        isSuccessful(): Boolean;
    }
}

Number.prototype.isSuccessful = function(): Boolean {
    return this >= 200 && this < 300
}

export {};
