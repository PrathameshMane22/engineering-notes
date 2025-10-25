#include <stdio.h>

// Function to perform linear convolution of two signals
void LC(float inputSignal[], int lengthX, float impulseResponse[], int lengthH, float outputSignal[]) {
    
    int i, j;

    // Iterate through each element of the output signal
    for (i = 0; i < lengthX + lengthH - 1; i++) {
        outputSignal[i] = 0; // Initialize each element to zero
        
        for (j = 0; j < lengthX; j++) {
            if (i - j >= 0 && i - j < lengthH) {
                outputSignal[i] += inputSignal[j] * impulseResponse[i - j];
            }
        }
    }
}


int main() {
    
    int index, lengthX, lengthH, outputLength;
    float signal[10], response[10], result[20];  // Arrays for input signals and output result

    // Initialize all arrays to zero
    for (index = 0; index < 10; index++) {
        signal[index] = response[index] = 0.0;
    }
    
    for (index = 0; index < 20; index++) {
        result[index] = 0.0;
    }

    // Get the length and values for input signal x[n]
    printf("\nEnter the length of the input signal x[n] (L): ");
    scanf("%d", &lengthX);

    printf("Enter the values for x[n]:\n");
    for (index = 0; index < lengthX; index++) {
        scanf("%f", &signal[index]);
    }

    // Get the length and values for the impulse response h[n]
    printf("\nEnter the length of the impulse response h[n] (M): ");
    scanf("%d", &lengthH);

    printf("Enter the values for h[n]:\n");
    for (index = 0; index < lengthH; index++) {
        scanf("%f", &response[index]);
    }

    // Calculate the length of the output signal y[n]
    outputLength = lengthX + lengthH - 1;

    // Perform the linear convolution
    LC(signal, lengthX, response, lengthH, result);

    // Display the input signal x[n]
    printf("\n\nx[n] = ");
    for (index = 0; index < lengthX; index++) {
        printf("  %1.2f  ", signal[index]);
    }

    // Display the impulse response h[n]
    printf("\n\nh[n] = ");
    for (index = 0; index < lengthH; index++) {
        printf("  %4.2f  ", response[index]);
    }

    // Display the output signal y[n]
    printf("\n\ny[n] = ");
    for (index = 0; index < outputLength; index++) {
        printf("  %4.2f  ", result[index]);
    }

    printf("\n\n");

    return 0;
}
