{
  description = "uniweb cms components flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    forAllSystems = f: builtins.mapAttrs f nixpkgs.legacyPackages;
  in {
    formatter = forAllSystems (system: pkgs: pkgs.alejandra);

    devShells = forAllSystems (system: pkgs: {
      default = pkgs.mkShellNoCC {
        packages = with pkgs; [
          cloudflared
          nodejs
          nodePackages.prettier
          superhtml
          typescript-language-server
          yarn
        ];
      };
    });
  };
}
