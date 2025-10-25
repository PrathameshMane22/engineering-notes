#include <stdio.h>
#include <math.h>

void compute_dft(int n, float real_in[], float imag_in[], float real_out[], float imag_out[]);
void compute_idft(int n, float real_in[], float imag_in[], float real_out[], float imag_out[]);
void compute_magnitude(int n, float real[], float imag[], float magnitude[]);
void display_magnitude(int n, float magnitude[]);

int main() {
    int n, i;
    float real_in[16], imag_in[16];
    float real_out[16], imag_out[16];
    float magnitude[16];

    // Initialize input arrays to 0
    for (i = 0; i < 16; i++) {
        real_in[i] = 0;
        imag_in[i] = 0;
    }

    printf("Enter the length of the signal (N): ");
    scanf("%d", &n);

    printf("Enter the real part of the signal x[n]: ");
    for (i = 0; i < n; i++) {
        scanf("%f", &real_in[i]);
    }

    // Compute DFT
    compute_dft(n, real_in, imag_in, real_out, imag_out);

    printf("\nX[k] computed by DFT:\n");
    for (i = 0; i < n; i++) {
        printf("%6.2f + j%6.2f\n", real_out[i], imag_out[i]);
    }

    // Compute Magnitude
    compute_magnitude(n, real_out, imag_out, magnitude);

    // Display Magnitude
    display_magnitude(n, magnitude);

    // Compute IDFT
    compute_idft(n, real_out, imag_out, real_in, imag_in);

    printf("\nx[n] computed by IDFT:\n");
    for (i = 0; i < n; i++) {
        printf("%6.2f + j%6.2f\n", real_in[i], imag_in[i]);
    }

    return 0;
}

void compute_dft(int n, float real_in[], float imag_in[], float real_out[], float imag_out[]) {
    int k, t;
    float angle;

    for (k = 0; k < n; k++) {
        real_out[k] = 0;
        imag_out[k] = 0;

        for (t = 0; t < n; t++) {
            angle = 2 * M_PI * k * t / n;
            real_out[k] += real_in[t] * cos(angle) + imag_in[t] * sin(angle);
            imag_out[k] += imag_in[t] * cos(angle) - real_in[t] * sin(angle);
        }
    }
}

void compute_idft(int n, float real_in[], float imag_in[], float real_out[], float imag_out[]) {
    int t, k;
    float angle;

    for (t = 0; t < n; t++) {
        real_out[t] = 0;
        imag_out[t] = 0;

        for (k = 0; k < n; k++) {
            angle = 2 * M_PI * k * t / n;
            real_out[t] += real_in[k] * cos(angle) - imag_in[k] * sin(angle);
            imag_out[t] += real_in[k] * sin(angle) + imag_in[k] * cos(angle);
        }

        real_out[t] /= n;
        imag_out[t] /= n;
    }
}

void compute_magnitude(int n, float real[], float imag[], float magnitude[]) {
    int i;
    for (i = 0; i < n; i++) {
        magnitude[i] = sqrt(real[i] * real[i] + imag[i] * imag[i]);
    }
}

void display_magnitude(int n, float magnitude[]) {
    int i;
    printf("\nMagnitude of X[k]:\n");
    for (i = 0; i < n; i++) {
        printf("%6.2f\n", magnitude[i]);
    }
}
