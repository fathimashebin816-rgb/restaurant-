using System.Text.Json;
using SiluzzCafe.DesignParser.Models;
using SiluzzCafe.DesignParser.Parsers;
using SiluzzCafe.DesignParser.Generators;

namespace SiluzzCafe.DesignParser;

class Program
{
    static async Task<int> Main(string[] args)
    {
        var designFilePath = args.Length > 0 
            ? args[0] 
            : Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "siluzz_cafe_design_system", "DESIGN.md");

        var generateConstants = args.Contains("--generate-constants");
        var outputDir = args.Contains("--output") 
            ? args[Array.IndexOf(args, "--output") + 1] 
            : Path.Combine(AppContext.BaseDirectory, "GeneratedTokens");

        designFilePath = Path.GetFullPath(designFilePath);

        if (!File.Exists(designFilePath))
        {
            Console.Error.WriteLine($"Error: DESIGN.md not found at {designFilePath}");
            return 1;
        }

        Console.WriteLine($"Parsing design system from: {designFilePath}");
        Console.WriteLine();

        try
        {
            var parser = new DesignParser();
            var designSystem = parser.Parse(designFilePath);

            // Output as formatted JSON
            var jsonOptions = new JsonSerializerOptions
            {
                WriteIndented = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(designSystem, jsonOptions);
            Console.WriteLine(json);

            // Also output summary
            Console.WriteLine();
            Console.WriteLine("=== DESIGN SYSTEM SUMMARY ===");
            Console.WriteLine($"Name: {designSystem.Name}");
            Console.WriteLine($"Colors: {CountProperties(designSystem.Colors)} tokens");
            Console.WriteLine($"Typography: {CountProperties(designSystem.Typography)} styles");
            Console.WriteLine($"Border Radius: {CountProperties(designSystem.Rounded)} sizes");
            Console.WriteLine($"Spacing: {CountProperties(designSystem.Spacing)} tokens");

            // Show key brand colors
            Console.WriteLine();
            Console.WriteLine("=== KEY BRAND COLORS ===");
            Console.WriteLine($"Primary:      {designSystem.Colors.Primary} (Fresh chlorophyll green)");
            Console.WriteLine($"Secondary:    {designSystem.Colors.Secondary} (Zesty carrot-citrus orange)");
            Console.WriteLine($"Tertiary:     {designSystem.Colors.Tertiary} (Muted sage gray-green)");
            Console.WriteLine($"Background:   {designSystem.Colors.Background} (Soft warm cream)");
            Console.WriteLine($"Surface:      {designSystem.Colors.Surface}");

            // Generate C# constants if requested
            if (generateConstants)
            {
                Console.WriteLine();
                Console.WriteLine("=== GENERATING C# CONSTANTS ===");
                DesignTokenGenerator.GenerateAll(designSystem, outputDir);
            }

            return 0;
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error parsing design system: {ex.Message}");
            Console.Error.WriteLine(ex.StackTrace);
            return 1;
        }
    }

    private static int CountProperties(object obj)
    {
        return obj.GetType().GetProperties().Length;
    }
}