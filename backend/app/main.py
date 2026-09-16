from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.database.seed_data import seed_database
from app.routes.scheme_routes import router as scheme_router
from app.routes.advisory_routes import router as advisory_router
from app.routes.geo_routes import router as geo_router
from app.routes.admin_routes import router as admin_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure database schema is initialized and seeded on startup
    seed_database()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AI-Driven Hyper-Local Business Advisory & Financial Structuring Assistant for Rural Entrepreneurs (SIH 2026)",
    version="1.0.0",
    lifespan=lifespan
)

# Enable robust CORS for Vercel production frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://samarth-ai-blue.vercel.app",
        "https://samarth-fte8420xu-saurav-dev.vercel.app",
        settings.FRONTEND_URL,
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(scheme_router, prefix=settings.API_V1_PREFIX)
app.include_router(advisory_router, prefix=settings.API_V1_PREFIX)
app.include_router(geo_router, prefix=settings.API_V1_PREFIX)
app.include_router(admin_router, prefix=settings.API_V1_PREFIX)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "docs_url": "/docs",
        "api_prefix": settings.API_V1_PREFIX
    }
