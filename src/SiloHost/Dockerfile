#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/runtime:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 30000

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["src/SiloHost/SiloHost.csproj", "src/SiloHost/"]
COPY ["src/Common/Common.csproj", "src/Common/"]
COPY ["src/Grains/Grains.csproj", "src/Grains/"]
COPY ["src/Interfaces/GrainsInterfaces.csproj", "src/Interfaces/"]
RUN dotnet nuget add source https://pkgs.dev.azure.com/asynchub/Orleans.Security/_packaging/Orleans.Security%40Local/nuget/v3/index.json
RUN dotnet restore "src/SiloHost/SiloHost.csproj"
COPY . .
# TODO: Fix "/src/src/" path.
WORKDIR "/src/src/SiloHost"
RUN dotnet build "SiloHost.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SiloHost.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SiloHost.dll"]