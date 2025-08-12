# Git y GitHub para Desarrolladores React

## ¿Por qué Git es Esencial para un Desarrollador React?

Imaginen que están desarrollando una aplicación React y después de semanas de trabajo, accidentalmente borran archivos importantes o introducen un bug que no pueden resolver. Sin Git, habrían perdido todo su progreso.

**Git es como una "máquina del tiempo" para tu código:**
- Guarda un historial completo de cambios
- Permite trabajar en equipo sin conflictos
- Facilita el despliegue y la integración continua
- Es un estándar en la industria (requisito laboral)

---

## Configuración Inicial

### Instalación de Git

**Windows:**
```bash
# Descargar desde: https://git-scm.com/
# O usar chocolatey:
choco install git
```

**macOS:**
```bash
# Con Homebrew:
brew install git
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install git
```

### Configuración Global
```bash
# Configurar nombre de usuario
git config --global user.name "Tu Nombre"

# Configurar email
git config --global user.email "tu.email@ejemplo.com"

# Configurar editor por defecto
git config --global core.editor "code --wait"

# Ver configuración actual
git config --list
```

---

## Conceptos Fundamentales

### ¿Qué es un Repositorio?
Un repositorio (repo) es un directorio que contiene:
- Todos los archivos de tu proyecto
- El historial completo de cambios
- Metadatos de Git (carpeta `.git`)

### Estados de los Archivos en Git

```
Working Directory → Staging Area → Repository
     (modified)        (staged)      (committed)
```

1. **Working Directory**: Archivos modificados pero no preparados
2. **Staging Area**: Archivos preparados para commit
3. **Repository**: Archivos confirmados en el historial

---

## Comandos Básicos con Proyecto en NodeJs

### 1. Iniciando un Proyecto on Git

```bash
# Crear proyecto React
echo "console.log('Hello world!')" | tee index.js

# Inicializar repositorio Git (create-react-app ya lo hace)
git init

# Ver estado actual
git status
```

### 2. Tu Primer Commit

```bash
# Agregar archivos al staging area
git add .
# O agregar archivos específicos:
git add src/App.js src/App.css

# Hacer commit con mensaje descriptivo
git commit -m "Initial commit: Setup React application"

# Ver historial
git log --oneline
```

### 3. Trabajando con Cambios

```bash
# Ver diferencias antes de hacer commit
git diff

# Ver diferencias en staging area
git diff --staged

# Agregar cambios específicos
git add src/components/

# Commit con mensaje detallado
git commit -m "feat: Add Header component with responsive design"
```

---

## Branching y Workflow

### ¿Por qué usar Branches?

En proyectos React, usamos branches para:
- Desarrollar features sin afectar la rama principal
- Experimentar con nuevas librerías
- Separar desarrollo de producción
- Trabajar en equipo sin conflictos

### Comandos de Branching

```bash
# Ver todas las ramas
git branch

# Crear nueva rama
git branch feature/login-component

# Cambiar a la rama
git checkout feature/login-component

# Crear y cambiar en un comando
git checkout -b feature/user-dashboard

# Volver a main
git checkout main

# Mergear rama
git merge feature/login-component

# Eliminar rama local
git branch -d feature/login-component
```

### Flujo de Trabajo Típico en React

```bash
# 1. Crear rama para nueva feature
git checkout -b feature/shopping-cart

# 2. Desarrollar el componente
# Editar: src/components/ShoppingCart.js
# Editar: src/components/CartItem.js

# 3. Agregar y commitear cambios
git add src/components/
git commit -m "feat: Implement shopping cart functionality"

# 4. Volver a main y mergear
git checkout main
git merge feature/shopping-cart

# 5. Limpiar rama
git branch -d feature/shopping-cart
```

---

## GitHub: Tu Repositorio en la Nube

### Configurando SSH (Recomendado)

```bash
# Generar clave SSH
ssh-keygen -t ed25519 -C "tu.email@ejemplo.com"

# Agregar clave al ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copiar clave pública
cat ~/.ssh/id_ed25519.pub
# Pegar en GitHub > Settings > SSH Keys
```

### Conectando Repositorio Local con GitHub

```bash
# Agregar remote origin
git remote add origin git@github.com:tuusuario/mi-app-react.git

# Verificar remote
git remote -v

# Subir código por primera vez
git push -u origin main

# Para pushes posteriores
git push
```

### Clonando Repositorios

```bash
# Clonar proyecto existente
git clone git@github.com:usuario/proyecto-react.git
cd proyecto-react

# Instalar dependencias de React
npm install

# Ejecutar proyecto
npm start
```

---

## Colaboración en Equipo

### Fork y Pull Requests (Proyectos Open Source)

1. **Fork** el repositorio en GitHub
2. **Clone** tu fork localmente
3. **Create** una nueva rama
4. **Make** tus cambios
5. **Push** a tu fork
6. **Create** Pull Request

```bash
# Después de fork, clonar tu fork
git clone git@github.com:tuusuario/proyecto-original.git

# Agregar upstream para mantener actualizado
git remote add upstream git@github.com:owner-original/proyecto-original.git

# Actualizar desde el repositorio original
git fetch upstream
git checkout main
git merge upstream/main
```

### Colaboración Directa (Misma Organización)

```bash
# Obtener cambios del servidor
git pull origin main

# Trabajar en rama feature
git checkout -b feature/navbar-responsive

# Subir rama al servidor
git push -u origin feature/navbar-responsive

# Crear Pull Request en GitHub para review
```

---

## Herramientas y Mejores Prácticas

### .gitignore para Proyectos React

```gitignore
# Dependencias
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Builds
build/
dist/

# Variables de entorno
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDEs
.vscode/
.idea/
*.swp
*.swo

# Sistema operativo
.DS_Store
Thumbs.db
```

### Mensajes de Commit Profesionales

**Formato:**
```
type(scope): description

[optional body]

[optional footer]
```

**Ejemplos:**
```bash
git commit -m "feat(auth): Add login component with form validation"
git commit -m "fix(api): Resolve CORS issue in user endpoints"
git commit -m "style(header): Update navigation styling for mobile"
git commit -m "refactor(utils): Extract API calls to separate service"
git commit -m "docs(readme): Add installation instructions"
```

**Tipos comunes:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Cambios de formato
- `refactor`: Refactorización
- `test`: Agregar tests
- `chore`: Tareas de mantenimiento

---

## Comandos de Rescate

### Deshacer Cambios

```bash
# Deshacer cambios en working directory
git checkout -- archivo.js

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer último commit (eliminar cambios)
git reset --hard HEAD~1

# Ver qué cambiaría un reset
git reset --hard HEAD~1 --dry-run
```

### Resolver Conflictos

```bash
# Cuando hay conflictos en merge
git status  # Ver archivos en conflicto

# Editar archivos manualmente o usar herramientas
git add archivo-resuelto.js

# Completar merge
git commit -m "resolve: Fix merge conflicts in user component"
```

### Stash (Guardar Cambios Temporalmente)

```bash
# Guardar cambios temporalmente
git stash

# Ver lista de stashes
git stash list

# Aplicar último stash
git stash pop

# Aplicar stash específico
git stash apply stash@{1}
```

---

## Ejercicio Práctico

### Proyecto: Sistema de Tareas React

**Paso 1: Setup**
```bash
npx create-react-app todo-app
cd todo-app
git add .
git commit -m "initial: Setup React todo application"
```

**Paso 2: Crear Componente**
```bash
git checkout -b feature/todo-component

# Crear src/components/TodoItem.js
# Crear src/components/TodoList.js

git add src/components/
git commit -m "feat(components): Add TodoItem and TodoList components"
```

**Paso 3: Subir a GitHub**
```bash
# Crear repo en GitHub
git remote add origin git@github.com:tuusuario/todo-app.git
git push -u origin main
git push -u origin feature/todo-component
```

**Paso 4: Pull Request y Merge**
- Crear PR en GitHub
- Review del código
- Merge a main

### Comandos de Consulta Rápida
```bash
git status          # Estado actual
git log --oneline   # Historial resumido
git branch -a       # Todas las ramas
git remote -v       # Repositorios remotos
git diff            # Diferencias
git help [comando]  # Ayuda específica
```

### Flujo de Desarrollo React Profesional

```bash
# 1. Actualizar rama principal
git checkout main
git pull origin main

# 2. Crear feature branch
git checkout -b feature/user-profile

# 3. Desarrollar y testear
npm test
npm run build

# 4. Commit siguiendo convenciones
git add .
git commit -m "feat(profile): Add user profile component with avatar upload"

# 5. Push y crear PR
git push -u origin feature/user-profile
# Crear Pull Request en GitHub

# 6. Después del merge, limpiar
git checkout main
git pull origin main
git branch -d feature/user-profile
```

---

## Conclusiones

Git y GitHub son herramientas **indispensables** para cualquier desarrollador React profesional. Dominar estos conceptos te permitirá:

- Trabajar con confianza en proyectos grandes
- Colaborar efectivamente en equipos
- Mantener un historial limpio y profesional
- Desplegar aplicaciones con pipelines CI/CD
- Contribuir a proyectos open source

**Próximos pasos:**
1. Practicar con proyectos personales
2. Contribuir a proyectos open source
3. Aprender sobre GitHub Actions
4. Explorar Git Flow y GitLab Flow

---

## Preguntas y Ejercicios

**Para la próxima clase:**
1. Crear un repositorio con un proyecto React
2. Implementar al menos 3 commits siguiendo convenciones
3. Crear y mergear una rama feature
4. Subir el proyecto a GitHub
