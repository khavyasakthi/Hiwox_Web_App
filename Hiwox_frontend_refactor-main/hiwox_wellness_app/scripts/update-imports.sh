#!/bin/bash
# scripts/update-imports.sh

# Update component imports
find src -type f \( -name "*.tsx" -o -name "*.ts" \) | while read file; do
  # Replace relative component imports
  sed -i "s|from '\.\./\.\./components|from '@/components|g" "$file"
  sed -i "s|from '\.\.\/components|from '@/components|g" "$file"
  
  # Replace relative service imports
  sed -i "s|from '\.\./\.\./services|from '@/services|g" "$file"
  sed -i "s|from '\.\.\/services|from '@/services|g" "$file"
  
  # Replace relative store imports
  sed -i "s|from '\.\./\.\./store|from '@/store|g" "$file"
  sed -i "s|from '\.\.\/store|from '@/store|g" "$file"
  
  # Replace relative type imports
  sed -i "s|from '\.\./\.\./types|from '@/types|g" "$file"
  sed -i "s|from '\.\.\/types|from '@/types|g" "$file"
  
  # Replace relative utils imports
  sed -i "s|from '\.\./\.\./utils|from '@/utils|g" "$file"
  sed -i "s|from '\.\.\/utils|from '@/utils|g" "$file"
  
  # Replace relative config imports
  sed -i "s|from '\.\./\.\./config|from '@/config|g" "$file"
  sed -i "s|from '\.\.\/config|from '@/config|g" "$file"
  
  # Replace relative styles imports
  sed -i "s|from '\.\./\.\./styles|from '@/styles|g" "$file"
  sed -i "s|from '\.\.\/styles|from '@/styles|g" "$file"
done

echo "Import paths updated!"
