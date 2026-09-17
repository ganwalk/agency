"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { SunIcon, Moon02Icon } from "@hugeicons/core-free-icons";

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
      className="flex items-center justify-center p-2 cursor-pointer"
      style={{ color: "var(--on-dark)" }}
    >
      {mounted && isDark ? (
        <HugeiconsIcon icon={SunIcon} size={18} />
      ) : (
        <HugeiconsIcon icon={Moon02Icon} size={18} />
      )}
    </button>
  );
}
