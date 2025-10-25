#include <stdio.h>
#include <math.h>

#define SIZE 8

void FFT_4_Point(int N, float input[SIZE][2], float output[SIZE][2]);
void FFT_8_Point(int N, float input[SIZE][2], float output[SIZE][2]);
void Inverse_FFT(int N, float input[SIZE][2], float output[SIZE][2]);

int main() {
    int i, n;
    float input[SIZE][2], output[SIZE][2];

    // Initialize input and output arrays
    for(i = 0; i < SIZE; i++) {
        output[i][0] = 0; 
        output[i][1] = 0; 
        input[i][0] = 0; 
        input[i][1] = 0; 
    }

    // Get the input signal length
    printf("\nEnter the length of x[n] (4 pt or 8 pt) = : ");
    scanf("%d", &n);

    if (n != 4 && n != 8) {
        printf("Length must be 4 or 8 for this implementation.\n");
        return 1;
    }

    // Get the input signal values
    printf("Enter the values of x[n]: ");
    for(i = 0; i < n; i++) {
        scanf("%f", &input[i][0]);
    }

    // Display the input signal
    printf("\nInput signal x[n] = ");
    for(i = 0; i < n; i++) {
        printf("  %4.2f  ", input[i][0]);
    }

    // Perform FFT
    if (n == 4) {
        FFT_4_Point(n, input, output);
    } else {
        FFT_8_Point(n, input, output);
    }

    // Display FFT results
    printf("\n\nFFT results X[k] = :\n");
    for(i = 0; i < n; i++) {
        printf("\n %7.3f  + j  %7.3f", output[i][0], output[i][1]);
    }
    printf("\n\n");

    // Perform Inverse FFT
    Inverse_FFT(n, output, input);

    // Display Inverse FFT results
    printf("\nInverse FFT results x[n] = :\n");
    for(i = 0; i < n; i++) {
        printf("\n %7.3f  + j  %7.3f", input[i][0], input[i][1]);
    }
    printf("\n\n");

    return 0;
}

void FFT_4_Point(int N, float input[SIZE][2], float output[SIZE][2]) {
    float temp[SIZE][2];
    int k;
    float angle = 2 * M_PI / N;

    // Stage 1
    temp[0][0] = input[0][0] + input[2][0];
    temp[0][1] = input[0][1] + input[2][1];

    temp[1][0] = input[0][0] - input[2][0];
    temp[1][1] = input[0][1] - input[2][1];

    temp[2][0] = input[1][0] + input[3][0];
    temp[2][1] = input[1][1] + input[3][1];

    temp[3][0] = input[1][0] - input[3][0];
    temp[3][1] = input[1][1] - input[3][1];

    // Stage 2
    for (k = 0; k < N; k++) {
        output[k][0] = temp[k % 2][0] + (temp[k % 2 + 2][0] * cos(angle * k) + temp[k % 2 + 2][1] * sin(angle * k));
        output[k][1] = temp[k % 2][1] + (temp[k % 2 + 2][1] * cos(angle * k) - temp[k % 2 + 2][0] * sin(angle * k));
    }
}

void FFT_8_Point(int N, float input[SIZE][2], float output[SIZE][2]) {
    float G[4][2], H[4][2], temp[SIZE][2];
    int k;
    float angle = 2 * M_PI / N;

    // Split input into two 4-point sequences
    for (k = 0; k < 4; k++) {
        G[k][0] = input[2 * k][0];
        G[k][1] = input[2 * k][1];
        H[k][0] = input[2 * k + 1][0];
        H[k][1] = input[2 * k + 1][1];
    }

    // Perform 4-point FFT on both sequences
    FFT_4_Point(4, G, G);
    FFT_4_Point(4, H, H);

    // Combine the results
    for (k = 0; k < 4; k++) {
        output[k][0] = G[k][0] + (H[k][0] * cos(angle * k) + H[k][1] * sin(angle * k));
        output[k][1] = G[k][1] + (H[k][1] * cos(angle * k) - H[k][0] * sin(angle * k));

        output[k + 4][0] = G[k][0] + (H[k][0] * cos(angle * (k + 4)) + H[k][1] * sin(angle * (k + 4)));
        output[k + 4][1] = G[k][1] + (H[k][1] * cos(angle * (k + 4)) - H[k][0] * sin(angle * (k + 4)));
    }
}

void Inverse_FFT(int N, float input[SIZE][2], float output[SIZE][2]) {
    int i;
    float temp[SIZE][2];

    // Take the conjugate of the input
    for (i = 0; i < N; i++) {
        temp[i][0] = input[i][0];
        temp[i][1] = -input[i][1];
    }

    // Perform FFT on the conjugate
    if (N == 4) {
        FFT_4_Point(N, temp, output);
    } else {
        FFT_8_Point(N, temp, output);
    }

    // Take the conjugate again and divide by N
    for (i = 0; i < N; i++) {
        output[i][0] = output[i][0] / N;
        output[i][1] = -output[i][1] / N;
    }
}
