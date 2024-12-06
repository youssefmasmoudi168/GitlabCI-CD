#!/bin/bash

CURRENT=0.0.0
if [[ -f envVars.properties ]]; then
  CURRENT=$(cat envVars.properties | grep -oP '(?<=RELEASE_VERSION= ).*(?=)')
else
  echo RELEASE_VERSION= $CURRENT >envVars.properties
fi

PATCH=$(echo $CURRENT | cut -d'.' -f3)
FEATURE=$(echo $CURRENT | cut -d'.' -f2)
RELEASE=$(echo $CURRENT | cut -d'.' -f1)
VERSION=$RELEASE.$FEATURE.$PATCH

case $1 in
patch)
  echo "Increment Patch version"
  ((PATCH += 1))
  VERSION=$RELEASE.$FEATURE.$PATCH
  ;;
feature)
  echo "Increment Feature version"
  PATCH=0
  ((FEATURE += 1))
  VERSION=$RELEASE.$FEATURE.$PATCH
  ;;
prerelease) ;;

release)
  echo "Increment Release version"
  PATCH=0
  FEATURE=0
  ((RELEASE += 1))
  VERSION=$RELEASE.$FEATURE.$PATCH
  ;;
-h | --help)
  echo -e '
  Version = x.y.z-prerelease
  patch: increment z
  feature: increment y
  release: increment x
  prerelease: increment prerelease
Command line options:
    patch       Increment z
    feature     Increment y
    release     Increment x
    prerelease  Increment prerelease
    -h          Print this help menu
Examples:
    Increment the z number (1.0.0 -> 1.0.1)
        '$(basename $0)' patch
    Increment the x number (1.0.0 -> 2.0.0)
        '$(basename $0)' release
'
  exit 0
  ;;
*)
  echo "Usage: $(basename $0) [-h|--help]"
  exit 0
  ;;
esac

echo "Current version: $CURRENT"
echo "Bumped version: $VERSION"

if [ -f package.json ]; then
  echo "Update from current version $CURRENT to $VERSION version in package.json"
  PACKAGE_VERSION_LIGNE_NUMBER=$(awk -v search="$CURRENT" '$0~search{print NR; exit}' package.json)
  sed -i -e "${PACKAGE_VERSION_LIGNE_NUMBER}s/${CURRENT}/${VERSION}/" package.json
else
  echo "package.json not found"
fi
if [ -f package-lock.json ]; then
  echo "Update from current version $CURRENT to $VERSION version in package-lock.json"
  PACKAGELOCK_VERSION_LIGNE_NUMBER=$(awk -v search="$CURRENT" '$0~search{print NR; exit}' package-lock.json)
  sed -i -e "${PACKAGELOCK_VERSION_LIGNE_NUMBER}s/${CURRENT}/${VERSION}/" package-lock.json
else
  echo "package-lock.json not found"
fi
if [ -f sonar-project.properties ]; then
  echo "Update from current version $CURRENT to $VERSION version in sonar-project.properties"
  sed -i -e "s/${CURRENT}/${VERSION}/" sonar-project.properties
else
  echo "sonar-project.properties not found"
fi

echo "Create environment variable $VERSION inside envVars.properties file"
echo RELEASE_VERSION= $VERSION >envVars.properties
