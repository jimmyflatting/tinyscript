<?php

function get_template_part($slug, $name = null, $args = array())
{
  // Define the template file names to search for
  $templates = array();
  $name = (string) $name;

  if (!empty($name)) {
    $templates[] = "{$slug}-{$name}.php";
  }

  $templates[] = "{$slug}.php";

  // Attempt to locate and load the template file
  foreach ($templates as $template) {
    $file = __DIR__ . "/../components/{$template}";

    if (file_exists($file)) {
      if (!empty($args) && is_array($args)) {
        extract($args); // Extract the $args array into variables
      }

      include $file;
      return;
    }
  }

  // Optionally, you could handle the case where the template is not found
  echo "Template part not found: {$slug}";
}
