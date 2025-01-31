include(CMakeFindDependencyMacro)
find_dependency(ZLIB)
find_dependency(PNG)
find_dependency(JPEG)
find_dependency(TIFF)
find_dependency(OpenJPEG)
find_dependency(WebP CONFIG)
find_dependency(JXR)
find_dependency(LibRaw)
find_dependency(OpenEXR)
find_dependency(Imath)
include("${CMAKE_CURRENT_LIST_DIR}/freeimage-targets.cmake")
