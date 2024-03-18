from setuptools import setup, find_packages

setup(
    name="attack_model",
    version="0.1.0",
    author="MITRE ATT&CK",
    author_email="attack@mitre.org",
    description="A Python package for working with STIX data models.",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/mitre-attack/attack_data_model",
    packages=find_packages(),
    install_requires=[
        "pydantic==2.6.1",
        "pytest==8.0.2"
        # List other dependencies required by your package
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.7",
)
