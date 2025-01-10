import os
import shutil

def move_qp_pdfs(source_folder, destination_folder):
    # Ensure destination folder exists
    os.makedirs(destination_folder, exist_ok=True)
    
    # List all files in the source folder
    for filename in os.listdir(source_folder):
        # Check if the file is a PDF and contains "qp" in its name
        if filename.lower().endswith(".pdf") and "qp" in filename.lower():
            source_path = os.path.join(source_folder, filename)
            destination_path = os.path.join(destination_folder, filename)
            
            # Move the file
            shutil.move(source_path, destination_path)
            print(f"Moved: {filename} -> {destination_folder}")

# Specify source and destination folders
source_folder = "D:\FYP\pdf to json\o-level-physics-5054-20241117T145438Z-001\o-level-physics-5054"  # Replace with the path to your source folder
destination_folder = "D:\FYP\Current\o-level-physics-5054-20241117T145438Z-001\physics_qp"  # Replace with the path to your destination folder

# Execute the function
move_qp_pdfs(source_folder, destination_folder)
