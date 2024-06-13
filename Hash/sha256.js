export const sha256 = (value) => {
    const SHA256 = new Hashes.SHA256;
    let hashedData = SHA256.hex(value);

    return hashedData;
}