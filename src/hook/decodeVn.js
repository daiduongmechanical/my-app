export function decodeVietnameseURL(url) {
  // Replace URL-encoded Vietnamese characters with their actual counterparts
  url = decodeURIComponent(
    url.replace(
      /(%C4%83|%C3%A2|%C4%89|%C4%91|%C3%AA|%C3%A9|%C3%A8|%C3%AA|%C3%AC|%C3%B4|%C6%A1|%C3%BA|%C6%B0|%C3%B4|%C3%BD)/gi,
      function (match) {
        switch (match.toLowerCase()) {
          case "%c4%83":
            return "ă";
          case "%c3%a2":
            return "â";
          case "%c4%89":
            return "đ";
          case "%c4%91":
            return "đ";
          case "%c3%aa":
            return "ê";
          case "%c3%a9":
            return "é";
          case "%c3%a8":
            return "è";
          case "%c3%ac":
            return "ì";
          case "%c3%b4":
            return "ô";
          case "%c6%a1":
            return "ơ";
          case "%c3%ba":
            return "ú";
          case "%c6%b0":
            return "ư";
          case "%c3%bd":
            return "ý";
          default:
            return match;
        }
      }
    )
  );

  return url.replace(/\+/g, " ");
}
