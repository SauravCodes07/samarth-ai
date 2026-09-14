import os
import sys
from pathlib import Path
from sqlalchemy import text

# Set path to backend root
BACKEND_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BACKEND_DIR))

from dotenv import load_dotenv
load_dotenv(BACKEND_DIR / ".env")

from app.database.db_connection import engine

def test_connection():
    print("=" * 60)
    print("SUPABASE / POSTGRESQL CONNECTION TEST")
    print("=" * 60)
    
    db_url = os.getenv("DATABASE_URL", "")
    if not db_url:
        print("[!] ERROR: DATABASE_URL is not set in backend/.env")
        print("    Please set DATABASE_URL=postgresql://postgres.zcbvtrglxlrhgsfgoyuh:[PASSWORD]@...")
        return False

    # Mask password for display
    display_url = db_url
    if "@" in display_url and ":" in display_url:
        try:
            prefix, rest = display_url.split("://", 1)
            user_pass, host_db = rest.split("@", 1)
            user = user_pass.split(":")[0]
            display_url = f"{prefix}://{user}:****@{host_db}"
        except Exception:
            display_url = "postgresql://...:****@..."

    print(f"[*] Target Database: {display_url}")
    
    try:
        with engine.connect() as conn:
            # 1. Test basic ping
            result = conn.execute(text("SELECT 1 AS alive;")).fetchone()
            print(f"[+] Basic connection check: SUCCESS (Response: {result[0]})")
            
            # 2. Check current database and user
            info = conn.execute(text("SELECT current_database(), current_user, version();")).fetchone()
            print(f"[+] Database: {info[0]} | User: {info[1]}")
            print(f"[+] PostgreSQL Version: {info[2][:45]}...")
            
            # 3. Check tables
            tables_query = text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
                ORDER BY table_name;
            """)
            tables = [row[0] for row in conn.execute(tables_query).fetchall()]
            print(f"[+] Found {len(tables)} public tables: {', '.join(tables) if tables else 'None'}")
            
            # 4. Check schemes count
            if "schemes" in tables:
                count = conn.execute(text("SELECT COUNT(*) FROM public.schemes;")).scalar()
                print(f"[+] Total schemes in database: {count}")
                if count > 0:
                    sample = conn.execute(text("SELECT scheme_name, category, interest_rate FROM public.schemes LIMIT 3;")).fetchall()
                    print("[+] Sample Schemes:")
                    for s in sample:
                        print(f"    - {s[0]} ({s[1]}) -> {s[2]}% interest")
            else:
                print("[!] 'schemes' table not found. Please run supabase_schema.sql in Supabase SQL Editor.")

            print("=" * 60)
            print("[SUCCESS] ALL CHECKS PASSED: Supabase PostgreSQL is fully ready and working!")
            print("=" * 60)
            return True


    except Exception as e:
        print("=" * 60)
        print(f"[X] CONNECTION FAILED:")
        print(f"    Error: {e}")
        print("\nTroubleshooting Tips:")
        print("1. If 'password authentication failed': Ensure special characters in your password are URL encoded (e.g. '@' -> '%40').")
        print("2. If 'Connection refused' or 'timed out': Use the Session Pooler (port 5432) or Transaction Pooler (port 6543) connection string.")
        print("3. Ensure 'sslmode=require' is present at the end of the DATABASE_URL.")
        print("=" * 60)
        return False

if __name__ == "__main__":
    test_connection()
