#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM acraci.azurecr.io/dotnet/sdk:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 8087
ENV ASPNETCORE_URLS=http://+:8087

FROM acraci.azurecr.io/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["src/ReactWebClient/ReactWebClient.csproj", "src/ReactWebClient/"]
RUN dotnet restore "src/ReactWebClient/ReactWebClient.csproj"
COPY . .
WORKDIR "/src/src/ReactWebClient"
RUN dotnet build "ReactWebClient.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ReactWebClient.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ReactWebClient.dll"]