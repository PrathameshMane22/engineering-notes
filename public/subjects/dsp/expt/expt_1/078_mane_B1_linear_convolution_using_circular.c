#include <stdio.h>

// Function to perform circular convolution
void circularConvolution(float signalA[], float signalB[], int N, float result[]) {
    int i, j;
    float sum;

    // Perform circular convolution
    for (i = 0; i < N; i++) {
        sum = 0.0;
        for (j = 0; j < N; j++) {
            int index = (i - j + N) % N;  // Handle circular indexing
            sum = sum + signalA[j] * signalB[index];
        }
        result[i] = sum;
    }
}

// Function to calculate linear convolution using circular convolution
void linearConvolutionViaCircular(float signalA[], float signalB[], int lengthA, int lengthB, float result[]) {
    int N = lengthA + lengthB - 1;
    float paddedA[20] = {0}, paddedB[20] = {0}, circResult[20] = {0};

    // Zero-padding the signals
    for (int i = 0; i < lengthA; i++) {
        paddedA[i] = signalA[i];
    }
    for (int i = 0; i < lengthB; i++) {
        paddedB[i] = signalB[i];
    }

    // Perform circular convolution on padded signals
    circularConvolution(paddedA, paddedB, N, circResult);

    // Extract the linear convolution result
    for (int i = 0; i < N; i++) {
        result[i] = circResult[i];
    }
}

int main() {
    int lengthA, lengthB, N;
    float signalA[20] = {0}, signalB[20] = {0}, output[20] = {0};

    // Get the length and values for the first signal
    printf("Enter the length of the first signal A: ");
    scanf("%d", &lengthA);
    printf("Enter the values of signal A:\n");
    for (int i = 0; i < lengthA; i++) {
        scanf("%f", &signalA[i]);
    }

    // Get the length and values for the second signal
    printf("\nEnter the length of the second signal B: ");
    scanf("%d", &lengthB);
    printf("Enter the values of signal B:\n");
    for (int i = 0; i < lengthB; i++) {
        scanf("%f", &signalB[i]);
    }

    // Calculate the length for linear convolution
    N = lengthA + lengthB - 1;

    // Perform linear convolution using circular convolution
    linearConvolutionViaCircular(signalA, signalB, lengthA, lengthB, output);

    // Display the input signals and the output signal
    printf("\nSignal A = ");
    for (int i = 0; i < lengthA; i++) {
        printf("%4.2f    ", signalA[i]);
    }

    printf("\nSignal B = ");
    for (int i = 0; i < lengthB; i++) {
        printf("%4.2f    ", signalB[i]);
    }

    printf("\n\nLinear Convolution Result y[n] = \n");
    for (int i = 0; i < N; i++) {
        printf("%4.2f   ", output[i]);
    }
    printf("\n");

    return 0;
}
