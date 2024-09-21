export function usePassword() {

    function shuffle(array: string[]): string[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

            // swap elements array[i] and array[j]
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    function createPassword(hasUppercase: boolean, hasLowercase: boolean, hasNumbers: boolean, hasSymbols: boolean, length: number): string {
        const valuesSelected = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(e => e === true)

        if (valuesSelected.length === 1) {
            if (hasUppercase) return shuffle(Array.from({ length: length }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26)))).join("")
            if (hasLowercase) return shuffle(Array.from({ length: length }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26)))).join("")
            if (hasNumbers) return shuffle(Array.from({ length: length }, () => String.fromCharCode(48 + Math.floor(Math.random() * 10)))).join("")
            if (hasSymbols) return shuffle(Array.from({ length: length }, () => String.fromCharCode(33 + Math.floor(Math.random() * 15)))).join("")
        }

        const randomValues: number[] = [];
        let remainingLength = length

        for (let i = 0; i < valuesSelected.length - 1; i++) {
            if (valuesSelected[i]) {
              // Calculate the max value for the current variable
              const maxValue = remainingLength - (valuesSelected.length - i - 1);
              
              // Generate the random value ensuring minimum is 1
              const randomValue = Math.floor(Math.random() * (maxValue - 1)) + 1;
          
              // Push the generated value to the array
              randomValues.push(randomValue);
          
              // Decrease the remaining length
              remainingLength -= randomValue;
            }
          }
          
          // Step 2: Set the last value to the remaining length
          randomValues.push(remainingLength);

        const password = Array.from({ length: randomValues[0] }, () => String.fromCharCode((Math.random() * 25) + 65)) // Creates an array of length uppercaseAmmount with random uppercase letters
        password.push(...Array.from({ length: randomValues[1] }, () => String.fromCharCode((Math.random() * 25) + 97))) // Adds lowercase letters to the array
        password.push(...Array.from({ length: randomValues[2] }, () => String.fromCharCode((Math.random() * 9) + 48))) // Adds numbers letters to the array
        password.push(...Array.from({ length: randomValues[3] }, () => String.fromCharCode(33 + Math.floor(Math.random() * 15)))) // Adds symbols letters to the array
        const shuffled = shuffle(password).join("")
        
        return shuffled
    }

    return { createPassword }
}