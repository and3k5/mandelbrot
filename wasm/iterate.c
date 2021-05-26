int getIteration(const int width, const int height, const int x, const int y, const int maxIteration)
{
    int iteration = 0;
    double i = 0;
    double j = 0;
    const double w = width;
    const double h = height;
    while (iteration++ < maxIteration)
    {
        const double a = i * i - j * j + ((x << 1) - 1.5 * (w)) / (w);
        j = 2.0 * i * j + ((y << 1) - (h)) / (h);
        i = a;
        if (i * i + j * j > 4.0)
            break;
    }
    return iteration;
}

void getIterations(int *result, const int width, const int height, const int maxIteration)
{
    int pos = 0;
    for (int x, y = 0; y < height; y++)
        for (x = 0; x < width; x++)
            result[pos++] = getIteration(width, height, x, y, maxIteration);
}