"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Info, Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { 
  assessmentConfig, 
  configurationPresets, 
  applyConfigurationPreset 
} from "@/lib/assessment-config";

export default function AssessmentConfigPage() {
  const [config, setConfig] = useState(assessmentConfig);
  const [selectedPreset, setSelectedPreset] = useState<string>("CUSTOM");
  const [hasChanges, setHasChanges] = useState(false);

  // Check if current config matches any preset
  useEffect(() => {
    const currentPreset = Object.entries(configurationPresets).find(([key, preset]) => 
      JSON.stringify(preset) === JSON.stringify(config)
    );
    setSelectedPreset(currentPreset ? currentPreset[0] : "CUSTOM");
  }, [config]);

  const handlePresetChange = (presetKey: string) => {
    if (presetKey === "CUSTOM") return;
    
    const preset = configurationPresets[presetKey as keyof typeof configurationPresets];
    setConfig({ ...preset });
    setSelectedPreset(presetKey);
    setHasChanges(true);
  };

  const handleConfigChange = (field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handlePatternChange = (patterns: string[]) => {
    setConfig(prev => ({
      ...prev,
      requiredPatterns: patterns
    }));
    setHasChanges(true);
  };

  const saveConfig = () => {
    // In a real implementation, this would save to a database or config file
    // For now, we'll just apply it to the runtime config
    Object.assign(assessmentConfig, config);
    setHasChanges(false);
    toast.success("Assessment configuration saved successfully!");
  };

  const resetConfig = () => {
    setConfig({ ...assessmentConfig });
    setHasChanges(false);
    toast.info("Configuration reset to last saved state");
  };

  const getPresetDescription = (key: string) => {
    switch (key) {
      case "MOUNJARO_ONLY":
        return "Only Mounjaro/Tirzepatide requires assessment (current default)";
      case "ALL_INJECTIONS":
        return "All injection products require assessment";
      case "ALL_GLP1":
        return "All GLP-1 medications require assessment";
      case "ALL_PRESCRIPTIONS":
        return "All prescription products require assessment";
      case "CUSTOM":
        return "Custom configuration";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Assessment Configuration</h1>
        <p className="text-muted-foreground">
          Configure which products require medical assessment before purchase
        </p>
      </div>

      <div className="grid gap-6">
        {/* Preset Configurations */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Presets</CardTitle>
            <CardDescription>
              Choose a pre-configured setting or customize your own
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPreset} onValueChange={handlePresetChange}>
              {Object.keys(configurationPresets).map((presetKey) => (
                <div key={presetKey} className="flex items-center space-x-2">
                  <RadioGroupItem value={presetKey} id={presetKey} />
                  <Label htmlFor={presetKey} className="flex-1 cursor-pointer">
                    <div>
                      <div className="font-medium">{presetKey.replace(/_/g, ' ')}</div>
                      <div className="text-sm text-muted-foreground">
                        {getPresetDescription(presetKey)}
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CUSTOM" id="CUSTOM" />
                <Label htmlFor="CUSTOM" className="flex-1 cursor-pointer">
                  <div>
                    <div className="font-medium">CUSTOM</div>
                    <div className="text-sm text-muted-foreground">
                      {getPresetDescription("CUSTOM")}
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Custom Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Configuration</CardTitle>
            <CardDescription>
              Fine-tune which products require assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Global Injection Setting */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">All Injections Require Assessment</Label>
                <div className="text-sm text-muted-foreground">
                  When enabled, ALL injection products will require assessment
                </div>
              </div>
              <Switch
                checked={config.requireAssessmentForAllInjections}
                onCheckedChange={(checked) => 
                  handleConfigChange('requireAssessmentForAllInjections', checked)
                }
              />
            </div>

            <Separator />

            {/* Product Name Patterns */}
            <div>
              <Label className="text-base mb-3 block">Product Name Patterns</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Products containing these words will require assessment (case-insensitive)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                {config.requiredPatterns.map((pattern, index) => (
                  <Badge key={index} variant="secondary" className="justify-center">
                    {pattern}
                  </Badge>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newPattern = prompt("Enter product name pattern:");
                  if (newPattern) {
                    handlePatternChange([...config.requiredPatterns, newPattern.toLowerCase()]);
                  }
                }}
              >
                Add Pattern
              </Button>
            </div>

            <Separator />

            {/* Current Status */}
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-900 dark:text-blue-100">
                  Current Configuration Summary
                </span>
              </div>
              <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <div>• All Injections: {config.requireAssessmentForAllInjections ? "✅ Required" : "❌ Not Required"}</div>
                <div>• Specific Patterns: {config.requiredPatterns.length} patterns configured</div>
                <div>• Custom Products: {Object.keys(config.specificProductRequirements).length} products</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <Button 
            variant="outline" 
            onClick={resetConfig}
            disabled={!hasChanges}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button 
            onClick={saveConfig}
            disabled={!hasChanges}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}