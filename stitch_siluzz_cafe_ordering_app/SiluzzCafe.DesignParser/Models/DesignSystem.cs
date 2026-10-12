namespace SiluzzCafe.DesignParser.Models;

/// <summary>
/// Root design system model containing all design tokens
/// </summary>
public sealed record DesignSystem(
    string Name,
    ColorTokens Colors,
    TypographyTokens Typography,
    RoundedTokens Rounded,
    SpacingTokens Spacing
);

/// <summary>
/// Color tokens from the design system
/// </summary>
public sealed record ColorTokens(
    string Surface,
    string SurfaceDim,
    string SurfaceBright,
    string SurfaceContainerLowest,
    string SurfaceContainerLow,
    string SurfaceContainer,
    string SurfaceContainerHigh,
    string SurfaceContainerHighest,
    string OnSurface,
    string OnSurfaceVariant,
    string InverseSurface,
    string InverseOnSurface,
    string Outline,
    string OutlineVariant,
    string SurfaceTint,
    string Primary,
    string OnPrimary,
    string PrimaryContainer,
    string OnPrimaryContainer,
    string InversePrimary,
    string Secondary,
    string OnSecondary,
    string SecondaryContainer,
    string OnSecondaryContainer,
    string Tertiary,
    string OnTertiary,
    string TertiaryContainer,
    string OnTertiaryContainer,
    string Error,
    string OnError,
    string ErrorContainer,
    string OnErrorContainer,
    string PrimaryFixed,
    string PrimaryFixedDim,
    string OnPrimaryFixed,
    string OnPrimaryFixedVariant,
    string SecondaryFixed,
    string SecondaryFixedDim,
    string OnSecondaryFixed,
    string OnSecondaryFixedVariant,
    string TertiaryFixed,
    string TertiaryFixedDim,
    string OnTertiaryFixed,
    string OnTertiaryFixedVariant,
    string Background,
    string OnBackground,
    string SurfaceVariant
);

/// <summary>
/// Typography tokens from the design system
/// </summary>
public sealed record TypographyTokens(
    FontToken DisplayLg,
    FontToken HeadlineLg,
    FontToken HeadlineLgMobile,
    FontToken HeadlineMd,
    FontToken HeadlineSm,
    FontToken TitleMd,
    FontToken TitleSm,
    FontToken BodyLg,
    FontToken BodyMd,
    FontToken BodySm,
    FontToken LabelLg,
    FontToken LabelMd,
    FontToken LabelSm
);

/// <summary>
/// Individual font token with all properties
/// </summary>
public sealed record FontToken(
    string FontFamily,
    string FontSize,
    string FontWeight,
    string LineHeight,
    string? LetterSpacing = null
);

/// <summary>
/// Border radius tokens
/// </summary>
public sealed record RoundedTokens(
    string Sm,
    string Default,
    string Md,
    string Lg,
    string Xl,
    string Full
);

/// <summary>
/// Spacing tokens
/// </summary>
public sealed record SpacingTokens(
    string Gutter,
    string GutterMobile,
    string GutterDesktop,
    string Margin,
    string MarginMobile,
    string MarginDesktop,
    string SpaceXs,
    string SpaceSm,
    string SpaceMd,
    string SpaceLg,
    string SpaceXl
);