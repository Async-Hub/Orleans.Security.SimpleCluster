#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 8087
ENV ASPNETCORE_URLS=http://+:8087

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["src/ReactWebClient/ReactWebClient.csproj", "src/ReactWebClient/"]
COPY ["src/Common/Common.csproj", "src/Common/"]
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_12.x | bash \
    && apt-get install nodejs -yq
RUN echo "NODE Version:" && node --version
RUN echo "NPM Version:" && npm --version
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