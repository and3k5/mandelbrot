int getIteration(int width, int height, int x, int y, int maxIteration)
{
    int iteration = 0;
    double i = 0;
    double j = 0;
    while (iteration++ < maxIteration)
    {
        double a = i * i - j * j + ((x << 1) - 1.5 * ((double)width)) / ((double)width);
        j = 2.0 * i * j + ((y << 1) - ((double)height)) / ((double)height);
        i = a;
        if (i * i + j * j > 4.0)
        {
            break;
        }
    }
    return iteration;
}

void getIterations(int *result, int width, int height, int maxIteration)
{
    int pos = 0;
    for (int x, y = 0; y < height; y++)
    {
        for (x = 0; x < width; x++)
        {
            result[pos++] = getIteration(width, height, x, y, maxIteration);
        }
    }
}