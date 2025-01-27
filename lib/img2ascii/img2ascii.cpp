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
  unsigned FreeImage_GetBPP(FIBITMAP *);
  unsigned int FreeImage_GetWidth(FIBITMAP *);
  unsigned int FreeImage_GetHeight(FIBITMAP *);
  FIBITMAP *FreeImage_Rescale(FIBITMAP *, int, int, FREE_IMAGE_FILTER);
  BYTE *FreeImage_GetBits(FIBITMAP *);
  void FreeImage_Unload(FIBITMAP *);
  void FreeImage_DeInitialise();

  float clamp (float n, float min, float max) {
    return n < min ? min : n > max ? max : n;
  }

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
      return (char *)"image not found\n";
    }

    const BOOL transparent = FreeImage_IsTransparent(img);
    size_t channels = transparent ? 4 : 3;

    const unsigned int width = FreeImage_GetWidth(img);
    const unsigned int height = FreeImage_GetHeight(img);

    // const unsigned int scaledWidth = floor(width * scale);
    // const unsigned int scaledHeight = floor(height * scale);

    unsigned int bpp = FreeImage_GetBPP(img);
    fprintf(stdout, "bpp: %u\n", bpp);

    // FIBITMAP *scaledImg = FreeImage_Rescale(img, scaledWidth, scaledHeight, FILTER_BOX);
    BYTE *imgData = FreeImage_GetBits(img);

    const size_t rowHeight = floor(height / rows);
    const size_t columnWidth = floor(width / columns);

    size_t final_i = 0, final_j = 0; 

    for (size_t i = rowHeight * rows * channels; i > 0 ; i -= channels * rowHeight)
    {
      for (size_t j = 0; j < width * channels; j += channels * columnWidth)
      {
        const size_t r = floor(imgData[i * width + j + 2]);
        const size_t g = floor(imgData[i * width + j + 1]);
        const size_t b = floor(imgData[i * width + j ]);

        const size_t gindex = clamp(floor(((float)((r + g + b) / 3) / 255.f * 2.f)), 0.f, 1.f);

        char className[256];
        int className_sz = sprintf(className, "text-[rgb(%zu,%zu,%zu)]", r, g, b);

        // fprintf(stdout, "className: %s\n", className);

        char key[16];
        int key_sz = sprintf(key, "%zu", (i * columns + j) / 3);
        // printf("key: %s\n", key);

        char *el = (char *)malloc(200 * sizeof(char));

        int json_sz = sprintf(el, "{ \"type\": \"span\", \"key\": \"%s\", \"_ref\": null, \"props\": { \"className\": \"%s\", \"children\": \"%s\", \"style\": { \"color\": \"rgb(%zu,%zu,%zu)\"} }, \"_owner\": null, \"_store\": {}},\n", key, className, gscale[gindex], r, g, b);

        // fprintf(stdout, "el:%s", el);

        elements = (char *)realloc(elements, (elements_sz + json_sz) * sizeof(char));
        elements = strcat(elements, el);

        elements_sz += json_sz;

        // fprintf(stdout, "elements:\n%s\n", elements);

        free(el);

        final_j = j;
      }
      char *br = (char *)malloc(200 * sizeof(char));
      const char *c = i > channels * rowHeight ? "," : " ";
      sprintf(br, "{\"type\":\"br\",\"key\": \"row-%zu-break\", \"_ref\": null, \"props\": {}, \"_owner\": null, \"_store\": {}}%s\n", i / channels, c);
      elements_sz += strlen(br);
      elements = (char *)realloc(elements, (elements_sz + 1) * sizeof(char));
      elements = strcat(elements, br);
      final_i = i;
    }

    printf("final_i: %zu\tfinal_j: %zu\n", final_i, final_j);
    printf("height / rows: %u\twidth / columns:%u\nrowHeight * rows:%zu\tcolumnWidth * columns: %zu\n", height / rows, width / columns, rowHeight * rows, columnWidth * columns);

    const char end[] = "]\n";

    elements = (char *)realloc(elements, (elements_sz + strlen(end) + 1) * sizeof(char));

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