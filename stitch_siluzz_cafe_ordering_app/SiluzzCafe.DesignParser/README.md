# Siluzz Cafe Design Parser

A .NET 8 console application that parses the Siluzz Cafe `DESIGN.md` file and converts design tokens into strongly-typed C# models.

## Features

- **Parses YAML frontmatter** from DESIGN.md
- **Strongly-typed models** for colors, typography, spacing, and border radius
- **JSON output** for integration with other tools
- **C# constant generation** for compile-time access to design tokens
- **Zero dependencies** on the design file format (only reads YAML frontmatter)

## Project Structure

```
SiluzzCafe.DesignParser/
├── Models/
│   └── DesignSystem.cs       # Strongly-typed record models
├── Parsers/
│   └── DesignParser.cs       # YAML parsing logic
├── Generators/
│   └── DesignTokenGenerator.cs  # C# code generation
├── Program.cs                # Console entry point
├── SiluzzCafe.DesignParser.csproj
└── README.md
```

## Installation

```bash
# Install .NET 8 SDK if not already installed
# https://dotnet.microsoft.com/download/dotnet/8.0

# Restore packages
dotnet restore

# Build
dotnet build
```

## Usage

### Parse and display design tokens as JSON

```bash
dotnet run --project SiluzzCafe.DesignParser
```

### Parse and generate C# constant files

```bash
dotnet run --project SiluzzCafe.DesignParser -- --generate-constants --output ./GeneratedTokens
```

### Specify custom DESIGN.md path

```bash
dotnet run --project SiluzzCafe.DesignParser -- /path/to/DESIGN.md
```

## Output Examples

### JSON Output

```json
{
  "name": "Siluzz Cafe Design System",
  "colors": {
    "primary": "#0d631b",
    "secondary": "#a04100",
    "tertiary": "#465a4c",
    "surface": "#f7f9ff",
    "background": "#f7f9ff",
    ...
  },
  "typography": {
    "displayLg": {
      "fontFamily": "Plus Jakarta Sans",
      "fontSize": "40px",
      "fontWeight": "700",
      "lineHeight": "48px",
      "letterSpacing": "-0.02em"
    },
    ...
  },
  "rounded": {
    "sm": "0.25rem",
    "default": "0.5rem",
    "md": "0.75rem",
    "lg": "1rem",
    "xl": "1.5rem",
    "full": "9999px"
  },
  "spacing": {
    "gutter": "1rem",
    "gutterMobile": "0.75rem",
    "gutterDesktop": "1.5rem",
    "margin": "1rem",
    "marginMobile": "1rem",
    "marginDesktop": "2.5rem",
    "spaceXs": "0.25rem",
    "spaceSm": "0.5rem",
    "spaceMd": "1rem",
    "spaceLg": "1.5rem",
    "spaceXl": "2rem"
  }
}
```

### Generated C# Constants

The `--generate-constants` flag creates these files in the output directory:

**Colors.cs**
```csharp
namespace SiluzzCafe.DesignTokens;

public static class Colors
{
    public const string Primary = "#0d631b";
    public const string Secondary = "#a04100";
    public const string Tertiary = "#465a4c";
    public const string Surface = "#f7f9ff";
    // ... 50+ color tokens
}
```

**Typography.cs**
```csharp
namespace SiluzzCafe.DesignTokens;

public static class Typography
{
    public static readonly FontToken DisplayLg = new(
        FontFamily: "Plus Jakarta Sans",
        FontSize: "40px",
        FontWeight: "700",
        LineHeight: "48px",
        LetterSpacing: "-0.02em"
    );
    // ... 13 typography styles
}
```

**Spacing.cs**
```csharp
namespace SiluzzCafe.DesignTokens;

public static class Spacing
{
    public const string Gutter = "1rem";
    public const string GutterMobile = "0.75rem";
    public const string GutterDesktop = "1.5rem";
    // ... 11 spacing tokens
}
```

**Rounded.cs**
```csharp
namespace SiluzzCafe.DesignTokens;

public static class Rounded
{
    public const string Sm = "0.25rem";
    public const string Default = "0.5rem";
    public const string Md = "0.75rem";
    public const string Lg = "1rem";
    public const string Xl = "1.5rem";
    public const string Full = "9999px";
}
```

## Integration

### Use in your .NET application

```csharp
using SiluzzCafe.DesignTokens;

// Access colors
var primaryButtonBg = Colors.Secondary;      // #a04100 (CTA orange)
var cardBackground = Colors.SurfaceContainerLowest; // #ffffff
var textPrimary = Colors.OnSurface;          // #181c20

// Access typography
var headlineStyle = Typography.HeadlineLg;
Console.WriteLine($"{headlineStyle.FontFamily}, {headlineStyle.FontSize}");

// Access spacing
var cardPadding = Spacing.SpaceMd;           // 1rem
var gutter = Spacing.GutterDesktop;          // 1.5rem

// Access border radius
var cardRadius = Rounded.Xl;                 // 1.5rem (rounded-2xl)
var buttonRadius = Rounded.Lg;               // 1rem (rounded-xl)
```

### Use with Blazor/MAUI/Avalonia

The generated constants work perfectly with:
- **Blazor** - Inline styles, CSS-in-C#, component parameters
- **MAUI** - Styles, ControlTemplate, VisualStateManager
- **Avalonia** - Styles, DynamicResource, ControlTheme
- **WPF/WinUI** - ResourceDictionary, Theme resources

## Extending

To add support for more design tokens (shadows, breakpoints, z-index, etc.):

1. Add properties to `RawDesignSystem` in `DesignParser.cs`
2. Add corresponding properties to `DesignSystem.cs` models
3. Update `MapToDesignSystem` method
4. Add generator method in `DesignTokenGenerator.cs`

## Design System Reference

The parser extracts tokens from the [Siluzz Cafe Design System](https://github.com/your-org/siluzz-cafe/blob/main/siluzz_cafe_design_system/DESIGN.md) which embodies:

- **Modern Organic Warmth** - Warm dairy-cream backgrounds, plant-derived greens
- **Clean Editorial Functionalism** - Crisp whitespace, rhythmic micro-interactions
- **Health-conscious aesthetic** - For urban professionals, wellness enthusiasts, balanced-diet diners

### Color Semantics

| Token | Hex | Purpose |
|-------|-----|---------|
| `Primary` | `#0d631b` | Brand green - organic integrity |
| `Secondary` | `#a04100` | CTA orange - conversion actions |
| `Tertiary` | `#465a4c` | Secondary UI - tags, micro-copy |
| `Surface` | `#f7f9ff` | Canvas background |
| `OnSurface` | `#181c20` | Primary text |

## License

MIT - Part of Siluzz Cafe ordering app project