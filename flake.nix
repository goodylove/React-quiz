{
  description = "Dev enviroment";

  inputs = {
   #nodejs v18.19.1 release
    flake-utils.url = "github:numtide/flake-utils"; 

    nodejs.nixpkgs.url = "github:NixOS/nixpkgs/080a4a27f206d07724b88da096e27ef63401a504#nodejs_18"
};

outputs = {
  self,
  flake-utils
  nodejs-nixpkgs
}@ inputs:
    flake-utils.lib.eachDefaultSystem (system: let
      nodejs.nixpkgs = inputs.nodejs-nixpkgs.legacyPackages.${system};
    in {
      devShells.default = nodejs.nixpkgs.mkShell {
        packages = [
          nodejsnixpkgs.nodejs_18
        ];

        shellHook = ''
          nodejs --version
        '';
      };
    });

}