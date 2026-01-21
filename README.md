<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>About SwargVatika</title>

<style>
    :root {
        --brand-green: #2d5016;
        --muted-green: #5a7a45;
        --bg-light: #f8f9fa;
        --card-bg: #ffffff;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: var(--bg-light);
        color: #333;
        line-height: 1.7;
    }

    .about-container {
        max-width: 900px;
        margin: 4rem auto;
        padding: 2.5rem 3rem;
        background: var(--card-bg);
        border-radius: 14px;
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
    }

    .about-title {
        font-size: 2.2rem;
        font-weight: 700;
        color: var(--brand-green);
        margin-bottom: 1.5rem;
        text-align: center;
    }

    .about-text {
        font-size: 1.05rem;
        color: #444;
        margin-bottom: 1.2rem;
        text-align: justify;
    }

    .highlight {
        color: var(--brand-green);
        font-weight: 600;
    }

    @media (max-width: 600px) {
        .about-container {
            margin: 2rem 1rem;
            padding: 2rem 1.5rem;
        }

        .about-title {
            font-size: 1.8rem;
        }

        .about-text {
            font-size: 1rem;
        }
    }
</style>
</head>

<body>

<section class="about-container">
    <h1 class="about-title">About SwargVatika</h1>

    <p class="about-text">
        <span class="highlight">SwargVatika</span> is a thoughtfully designed farm-to-consumer web platform created to connect
        consumers directly with fresh, organic agricultural produce sourced straight from the farm.
        The platform emphasizes transparency, simplicity, and trust by allowing users to explore
        products without intermediaries or unnecessary complexity.
    </p>

    <p class="about-text">
        Built with a strong focus on <span class="highlight">clean user interface design</span>,
        <span class="highlight">responsive accessibility</span>, and <span class="highlight">scalable architecture</span>,
        SwargVatika ensures a smooth and intuitive browsing experience across all devices.
        Every design choice prioritizes usability, clarity, and performance, making the platform
        approachable for both first-time visitors and returning users.
    </p>

    <p class="about-text">
        While the current implementation centers on a robust frontend foundation,
        SwargVatika is structured with long-term growth in mind. The platform is designed to
        seamlessly evolve into a complete digital marketplace, capable of supporting user accounts,
        order management, backend services, and data-driven features as it matures.
    </p>

    <p class="about-text">
        At its core, SwargVatika represents a modern approach to sustainable commerce —
        blending traditional agricultural values with contemporary web technologies to create
        a reliable, future-ready solution for farm-based product distribution.
    </p>
</section>

</body>
</html>
