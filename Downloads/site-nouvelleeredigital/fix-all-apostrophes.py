#!/usr/bin/env python3
"""
Script pour corriger automatiquement les apostrophes non échappées dans les fichiers JSX/TSX
"""
import os
import re
from pathlib import Path

def fix_apostrophes_in_jsx(content):
    """
    Remplace les apostrophes ' par &apos; dans les contenus JSX (entre balises >...</)
    et les guillemets " par &quot; dans les contenus JSX
    """
    lines = content.split('\n')
    fixed_lines = []

    for line in lines:
        # Ignorer les lignes de code pur (import, const, etc.)
        if line.strip().startswith(('import ', 'export ', 'const ', 'let ', 'var ', 'function ', '//', '/*', '*/')):
            fixed_lines.append(line)
            continue

        # Chercher le contenu textuel dans les balises JSX
        # Pattern: >texte avec apostrophe<
        pattern = r'>((?:[^<>]|<(?!/?\w))*?[\'"][^<>]*?)<'

        def replace_quotes(match):
            full_match = match.group(0)
            content_part = match.group(1)

            # Ne pas toucher si c'est du code JavaScript
            if '{' in content_part or '}' in content_part:
                return full_match

            # Remplacer les apostrophes
            fixed_content = content_part.replace("'", "&apos;")

            # Remplacer les guillemets si c'est une citation
            if content_part.count('"') == 2:  # Citation complète
                fixed_content = fixed_content.replace('"', '&quot;')

            return '>' + fixed_content + '<'

        fixed_line = re.sub(pattern, replace_quotes, line)
        fixed_lines.append(fixed_line)

    return '\n'.join(fixed_lines)

def process_file(file_path):
    """Traite un fichier TSX/JSX"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        fixed_content = fix_apostrophes_in_jsx(content)

        if fixed_content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            print(f"✓ Corrigé: {file_path}")
            return True
        else:
            print(f"○ Aucun changement: {file_path}")
            return False
    except Exception as e:
        print(f"✗ Erreur sur {file_path}: {e}")
        return False

def main():
    """Traite tous les fichiers TSX/JSX dans le dossier components"""
    components_dir = Path("apps/web/components")

    if not components_dir.exists():
        print("❌ Dossier components non trouvé")
        return

    total_files = 0
    fixed_files = 0

    for tsx_file in components_dir.rglob("*.tsx"):
        total_files += 1
        if process_file(tsx_file):
            fixed_files += 1

    print(f"\n📊 Résumé: {fixed_files}/{total_files} fichiers corrigés")

if __name__ == "__main__":
    main()
