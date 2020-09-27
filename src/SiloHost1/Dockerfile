#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/runtime:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 30000

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["src/SiloHost1/SiloHost1.csproj", "src/SiloHost1/"]
COPY ["src/Common/Common.csproj", "src/Common/"]
COPY ["src/Grains/Grains.csproj", "src/Grains/"]
COPY ["src/Interfaces/GrainsInterfaces.csproj", "src/Interfaces/"]
RUN dotnet nuget add source https://pkgs.dev.azure.com/asynchub/Orleans.Security/_packaging/Orleans.Security%40Local/nuget/v3/index.json
RUN dotnet restore "src/SiloHost1/SiloHost1.csproj"
COPY . .
WORKDIR "/src/src/SiloHost1"
RUN dotnet build "SiloHost1.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SiloHost1.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SiloHost1.dll"]