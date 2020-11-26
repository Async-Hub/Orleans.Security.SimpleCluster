#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS base
RUN curl -sL https://deb.nodesource.com/setup_12.x |  bash -
RUN apt-get install -y nodejs
WORKDIR /app
EXPOSE 8087
ENV ASPNETCORE_URLS=http://+:8087

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
RUN curl -sL https://deb.nodesource.com/setup_12.x |  bash -
RUN apt-get install -y nodejs
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