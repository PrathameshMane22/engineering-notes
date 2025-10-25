#include <stdio.h>

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

int main() {
    int lengthA, lengthB, N;
    float signalA[20], signalB[20], output[20];

    // Initialize arrays to zero
    for (int i = 0; i < 20; i++) {
        signalA[i] = signalB[i] = output[i] = 0.0;
    }

    // Get the length and values for the first signal
    printf("Enter the length of the first signal A: ");
    scanf("%d", &lengthA);
    printf("Enter the values of signal A:\n");
    for (int i = 0; i < lengthA; i++) {
        scanf("%f", &signalA[i]);
    }

    // Get the length and values for the second signal
    printf("\n\nEnter the length of the second signal B: ");
    scanf("%d", &lengthB);
    printf("Enter the values of signal B:\n");
    for (int i = 0; i < lengthB; i++) {
        scanf("%f", &signalB[i]);
    }

    // Determine the maximum length for circular convolution
    //use tertitary operator
    N = (lengthA > lengthB) ? lengthA : lengthB;

    // Perform circular convolution
    circularConvolution(signalA, signalB, N, output);

    // Display the input signals and the output signal
    printf("\nSignal A = ");
    for (int i = 0; i < N; i++) {
        printf("%4.2f    ", signalA[i]);
    }

    printf("\nSignal B = ");
    for (int i = 0; i < N; i++) {
        printf("%4.2f    ", signalB[i]);
    }

    printf("\n\nCircular Convolution Result y[n] = ");
    for (int i = 0; i < N; i++) {
        printf("%4.2f   ", output[i]);
    }
    printf("\n");

    return 0;
}
