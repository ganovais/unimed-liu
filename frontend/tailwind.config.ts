import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primaryU: '#00A76D',
        green: '#00A76D',
        primaryDark: '#008A5A',
        primaryLight: '#58C09F',
        secondaryU: '#8E91A8',
        info: '#2C8CED',
        success: '#60C466',
        warning: '#FFA13D',
        error: '#FF6B6B',
        light: '#F4F5F7',
        dark: '#2C3E63',
        white: '#FFFFFF',
        strongGray: '#9A9A9A',

        //Padrão
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      // Outras configurações personalizadas
      boxShadow: {
        custom: '0 4px 10px rgba(0, 153, 92, 0.6)',
        customHover: '0 8px 15px rgba(0, 153, 92, 0.6)',
        customCardTitle: '0 4px 10px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        nunito: ['"Nunito"', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'cursive'],
        josefin: ['"Josefin Sans"', 'sans-serif'],
      },
      spacing: {
        '5': '5px',
        '10': '10px',
        '15': '15px',
        '20': '20px',
        '38': '38px',
      },
        
      // Outras configurações padrão
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config