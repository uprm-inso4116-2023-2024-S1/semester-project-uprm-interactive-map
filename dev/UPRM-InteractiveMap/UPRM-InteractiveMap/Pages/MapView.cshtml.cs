using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace UPRM_InteractiveMap.Pages
{
    public class MapViewModel : PageModel
    {
        private readonly ILogger<MapViewModel> _logger;

        public MapViewModel(ILogger<MapViewModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
    }
}