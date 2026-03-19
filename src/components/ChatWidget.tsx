import { useEffect } from "react";

export function ChatWidget() {
  useEffect(() => {
    // Tawk.to configuration
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    // Create and inject the tawk.to script
    (function () {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/69bc5a176e8f601c36d1c680/1jk3rvr9t";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode?.insertBefore(s1, s0);
    })();

    // Cleanup function to remove script on unmount
    return () => {
      // Tawk.to widget will remain active until the user closes it
      // This is intentional behavior for better user experience
    };
  }, []);

  // Tawk.to renders its own widget in the DOM, so we don't need to render anything
  return null;
}
