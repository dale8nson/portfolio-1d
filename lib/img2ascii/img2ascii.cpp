#include <emscripten.h>
#include <cstdlib>
#include <FreeImage.h>
#include <cstdint>
#include <cstring>
#include <cstdio>
#include <cmath>
#include <cstdlib>

extern "C"
{
  
  void FreeImage_Initialise(BOOL);
  FIBITMAP *FreeImage_Load(FREE_IMAGE_FORMAT, const char *, int);
  BOOL FreeImage_IsTransparent(FIBITMAP *);
  unsigned int FreeImage_GetWidth(FIBITMAP *);
  unsigned int FreeImage_GetHeight(FIBITMAP *);
  FIBITMAP *FreeImage_Rescale(FIBITMAP *, int, int, FREE_IMAGE_FILTER);
  BYTE *FreeImage_GetBits(FIBITMAP *);
  void FreeImage_Unload(FIBITMAP *);
  void FreeImage_DeInitialise();

  EMSCRIPTEN_KEEPALIVE
  char *img2ascii(const char *src, unsigned int rows, unsigned int columns, float scale)
  {

    fprintf(stdout, "src: %s\nrows: %u\tcolumns: %u\tscale: %f\n", src, rows, columns, scale);

    const size_t sz = rows * columns;

    const char *gscale[2] = {"0", "1"};

    const char *start = "[\n";
    char *elements = (char *)malloc((strlen(start) + 1) * sizeof(char));
    elements = strncpy(elements, start, strlen(start) + 1);
    size_t elements_sz = strlen(elements) + 1;

    // printf("elements before loops: %s\n", elements);
  
    FreeImage_Initialise(0);

    FIBITMAP *img = FreeImage_Load(FIF_JPEG, src, JPEG_DEFAULT);

    if (!img)
    {
      fprintf(stderr, "%s", "image not found");
      return (char *) "image not found\n";
    }

    const BOOL transparent = FreeImage_IsTransparent(img);
    size_t channels = transparent ? 4 : 3;

    const unsigned int width = FreeImage_GetWidth(img);
    const unsigned int height = FreeImage_GetHeight(img);

    const unsigned int scaledWidth = floor(width * scale);
    const unsigned int scaledHeight = floor(height * scale);

    FIBITMAP *scaledImg = FreeImage_Rescale(img, scaledWidth, scaledHeight, FILTER_BILINEAR);
    BYTE *imgData = FreeImage_GetBits(scaledImg);

    const size_t rowHeight = floor(scaledHeight / rows);
    const size_t columnWidth = floor(scaledWidth / columns);

    for (size_t i = 0; i < scaledHeight * channels; i += channels * rowHeight)
    {
      for (size_t j = 0; j < scaledWidth * channels; j += channels * columnWidth)
      {
        const uint8_t r = floor(imgData[i * scaledWidth + j]);
        const uint8_t g = floor(imgData[i * scaledWidth + j + 1]);
        const uint8_t b = floor(imgData[i * scaledWidth + j + 2]);

        const size_t gindex = floor((r + g + b) / 3 / 255 * 2);

        char className[256];
        int className_sz = sprintf(className, "text-[rgb(%u,%u,%u)]", r, g, b);

        // fprintf(stdout, "className: %s\n", className);

        char key[16];
        int key_sz = sprintf(key, "%zu", (i + j) / 3);
        // printf("key: %s\n", key);

        char *el = (char *)malloc(200 * sizeof(char));

        int json_sz = sprintf(el, "{ \"type\": \"span\", \"key\": %s, \"_ref\": null, \"props\": { \"className\": \"%s\", \"children\": \"%s\" }, \"_owner\": null, \"_store\": {}},\n", key, className, gscale[gindex]);

        // fprintf(stdout, "el:%s", el);


        elements = (char *)realloc(elements, (elements_sz + json_sz) * sizeof(char));
        elements = strcat(elements, el);

        elements_sz += json_sz;

        // fprintf(stdout, "elements:\n%s\n", elements);

        free(el);
      }
      char *br = (char *) malloc(200 * sizeof(char));
        const char *c = i <  (scaledHeight * channels - channels * rowHeight) ? "," : " ";
        sprintf(br, "{\"type\":\"br\",\"key\": \"row-%zu-break\", \"_ref\": null, \"props\": {}, \"_owner\": null, \"_store\": {}}%s\n", i / channels, c);
        elements_sz += strlen(br);
        elements = (char *) realloc(elements, (elements_sz + 1) * sizeof(char));
        elements = strcat(elements, br);
        
    }

    const char end[] = "]\n";

    elements = (char *) realloc(elements, (elements_sz + strlen(end) + 1) * sizeof(char));

    strcat(elements, end);

    // fprintf(stdout, "elements:\n%s\n", elements);

    FreeImage_Unload(img);
    FreeImage_DeInitialise();

    return elements;
  }

  // int main()
  // {
  //   char *src = "/Users/dale8nson/dev/portfolio-1d/public/ProfilePicture.jpg";
  //   unsigned int rows = 100;
  //   unsigned int columns = 75;
  //   float scale = 0.03125;

  //   char *json = img2ascii(src, rows, columns, scale);

  //   printf("%s", json);

  //   return 0;
  // }
}