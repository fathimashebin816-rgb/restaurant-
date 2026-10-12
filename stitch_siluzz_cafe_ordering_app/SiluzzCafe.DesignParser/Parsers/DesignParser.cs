using System.Text.RegularExpressions;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;
using SiluzzCafe.DesignParser.Models;

namespace SiluzzCafe.DesignParser.Parsers;

/// <summary>
/// Parses the DESIGN.md file and extracts design tokens into strongly-typed C# models
/// </summary>
public sealed class DesignParser
{
    private readonly IDeserializer _yamlDeserializer;

    public DesignParser()
    {
        _yamlDeserializer = new DeserializerBuilder()
            .WithNamingConvention(CamelCaseNamingConvention.Instance)
            .IgnoreUnmatchedProperties()
            .Build();
    }

    /// <summary>
    /// Parses the DESIGN.md file and returns a DesignSystem object
    /// </summary>
    public DesignSystem Parse(string filePath)
    {
        var content = File.ReadAllText(filePath);
        var yamlFrontMatter = ExtractYamlFrontMatter(content);
        
        var rawDesign = _yamlDeserializer.Deserialize<RawDesignSystem>(yamlFrontMatter);
        return MapToDesignSystem(rawDesign);
    }

    /// <summary>
    /// Extracts YAML frontmatter from markdown file (between --- delimiters)
    /// </summary>
    private static string ExtractYamlFrontMatter(string content)
    {
        var match = Regex.Match(content, @"^---[\r\n]+(.*?)[\r\n]+---", RegexOptions.Singleline);
        if (!match.Success)
        {
            throw new InvalidOperationException("No YAML frontmatter found in DESIGN.md");
        }
        return match.Groups[1].Value;
    }

    /// <summary>
    /// Maps the raw YAML structure to our strongly-typed models
    /// </summary>
    private DesignSystem MapToDesignSystem(RawDesignSystem raw)
    {
        return new DesignSystem(
            Name: raw.Name,
            Colors: MapColors(raw.Colors),
            Typography: MapTypography(raw.Typography),
            Rounded: MapRounded(raw.Rounded),
            Spacing: MapSpacing(raw.Spacing)
        );
    }

    private ColorTokens MapColors(Dictionary<string, string> colors)
    {
        return new ColorTokens(
            Surface: GetColor(colors, "surface"),
            SurfaceDim: GetColor(colors, "surface-dim"),
            SurfaceBright: GetColor(colors, "surface-bright"),
            SurfaceContainerLowest: GetColor(colors, "surface-container-lowest"),
            SurfaceContainerLow: GetColor(colors, "surface-container-low"),
            SurfaceContainer: GetColor(colors, "surface-container"),
            SurfaceContainerHigh: GetColor(colors, "surface-container-high"),
            SurfaceContainerHighest: GetColor(colors, "surface-container-highest"),
            OnSurface: GetColor(colors, "on-surface"),
            OnSurfaceVariant: GetColor(colors, "on-surface-variant"),
            InverseSurface: GetColor(colors, "inverse-surface"),
            InverseOnSurface: GetColor(colors, "inverse-on-surface"),
            Outline: GetColor(colors, "outline"),
            OutlineVariant: GetColor(colors, "outline-variant"),
            SurfaceTint: GetColor(colors, "surface-tint"),
            Primary: GetColor(colors, "primary"),
            OnPrimary: GetColor(colors, "on-primary"),
            PrimaryContainer: GetColor(colors, "primary-container"),
            OnPrimaryContainer: GetColor(colors, "on-primary-container"),
            InversePrimary: GetColor(colors, "inverse-primary"),
            Secondary: GetColor(colors, "secondary"),
            OnSecondary: GetColor(colors, "on-secondary"),
            SecondaryContainer: GetColor(colors, "secondary-container"),
            OnSecondaryContainer: GetColor(colors, "on-secondary-container"),
            Tertiary: GetColor(colors, "tertiary"),
            OnTertiary: GetColor(colors, "on-tertiary"),
            TertiaryContainer: GetColor(colors, "tertiary-container"),
            OnTertiaryContainer: GetColor(colors, "on-tertiary-container"),
            Error: GetColor(colors, "error"),
            OnError: GetColor(colors, "on-error"),
            ErrorContainer: GetColor(colors, "error-container"),
            OnErrorContainer: GetColor(colors, "on-error-container"),
            PrimaryFixed: GetColor(colors, "primary-fixed"),
            PrimaryFixedDim: GetColor(colors, "primary-fixed-dim"),
            OnPrimaryFixed: GetColor(colors, "on-primary-fixed"),
            OnPrimaryFixedVariant: GetColor(colors, "on-primary-fixed-variant"),
            SecondaryFixed: GetColor(colors, "secondary-fixed"),
            SecondaryFixedDim: GetColor(colors, "secondary-fixed-dim"),
            OnSecondaryFixed: GetColor(colors, "on-secondary-fixed"),
            OnSecondaryFixedVariant: GetColor(colors, "on-secondary-fixed-variant"),
            TertiaryFixed: GetColor(colors, "tertiary-fixed"),
            TertiaryFixedDim: GetColor(colors, "tertiary-fixed-dim"),
            OnTertiaryFixed: GetColor(colors, "on-tertiary-fixed"),
            OnTertiaryFixedVariant: GetColor(colors, "on-tertiary-fixed-variant"),
            Background: GetColor(colors, "background"),
            OnBackground: GetColor(colors, "on-background"),
            SurfaceVariant: GetColor(colors, "surface-variant")
        );
    }

    private TypographyTokens MapTypography(Dictionary<string, RawFontToken> typography)
    {
        return new TypographyTokens(
            DisplayLg: MapFont(typography["display-lg"]),
            HeadlineLg: MapFont(typography["headline-lg"]),
            HeadlineLgMobile: MapFont(typography["headline-lg-mobile"]),
            HeadlineMd: MapFont(typography["headline-md"]),
            HeadlineSm: MapFont(typography["headline-sm"]),
            TitleMd: MapFont(typography["title-md"]),
            TitleSm: MapFont(typography["title-sm"]),
            BodyLg: MapFont(typography["body-lg"]),
            BodyMd: MapFont(typography["body-md"]),
            BodySm: MapFont(typography["body-sm"]),
            LabelLg: MapFont(typography["label-lg"]),
            LabelMd: MapFont(typography["label-md"]),
            LabelSm: MapFont(typography["label-sm"])
        );
    }

    private FontToken MapFont(RawFontToken raw)
    {
        return new FontToken(
            FontFamily: raw.FontFamily,
            FontSize: raw.FontSize,
            FontWeight: raw.FontWeight,
            LineHeight: raw.LineHeight,
            LetterSpacing: raw.LetterSpacing
        );
    }

    private RoundedTokens MapRounded(Dictionary<string, string> rounded)
    {
        return new RoundedTokens(
            Sm: rounded["sm"],
            Default: rounded["default"],
            Md: rounded["md"],
            Lg: rounded["lg"],
            Xl: rounded["xl"],
            Full: rounded["full"]
        );
    }

    private SpacingTokens MapSpacing(Dictionary<string, string> spacing)
    {
        return new SpacingTokens(
            Gutter: spacing["gutter"],
            GutterMobile: spacing["gutter-mobile"],
            GutterDesktop: spacing["gutter-desktop"],
            Margin: spacing["margin"],
            MarginMobile: spacing["margin-mobile"],
            MarginDesktop: spacing["margin-desktop"],
            SpaceXs: spacing["space-xs"],
            SpaceSm: spacing["space-sm"],
            SpaceMd: spacing["space-md"],
            SpaceLg: spacing["space-lg"],
            SpaceXl: spacing["space-xl"]
        );
    }

    private static string GetColor(Dictionary<string, string> dict, string key)
    {
        return dict.TryGetValue(key, out var value) ? value : string.Empty;
    }
}

/// <summary>
/// Raw YAML structure for deserialization
/// </summary>
internal sealed class RawDesignSystem
{
    public string Name { get; set; } = string.Empty;
    public Dictionary<string, string> Colors { get; set; } = new();
    public Dictionary<string, RawFontToken> Typography { get; set; } = new();
    public Dictionary<string, string> Rounded { get; set; } = new();
    public Dictionary<string, string> Spacing { get; set; } = new();
}

internal sealed class RawFontToken
{
    public string FontFamily { get; set; } = string.Empty;
    public string FontSize { get; set; } = string.Empty;
    public string FontWeight { get; set; } = string.Empty;
    public string LineHeight { get; set; } = string.Empty;
    public string? LetterSpacing { get; set; }
}