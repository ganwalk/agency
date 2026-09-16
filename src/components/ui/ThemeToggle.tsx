"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

// Cor sempre clara (var(--on-dark)): o botão vive no chrome escuro fixo
// (header, menu mobile), que não muda com o tema do site.
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Padrão recomendado pelo next-themes: só assim dá para saber, no
  // cliente, que a hidratação terminou e o tema resolvido (localStorage/SO)
  // já é real, evitando piscar o ícone errado no primeiro paint.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      aria-pressed={mounted ? isDark : undefined}
      className="p-2 -m-2 cursor-pointer"
      style={{ color: "var(--on-dark)" }}
    >
      {mounted && isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
