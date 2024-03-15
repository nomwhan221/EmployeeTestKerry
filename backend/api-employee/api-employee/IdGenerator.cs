namespace api_employee
{
    public class IdGenerator
    {
        private const string CounterFilePath = "counter.txt";

        public static string GenerateId()
        {
            long currentId;
            try
            {
                using (var streamReader = new StreamReader(CounterFilePath))
                {
                    currentId = long.Parse(streamReader.ReadLine());
                }
            }
            catch (FileNotFoundException)
            {
                currentId = 0; // Initialize counter if file doesn't exist
            }

            currentId++;

            using (var streamWriter = new StreamWriter(CounterFilePath, false)) // Overwrite file
            {
                streamWriter.WriteLine(currentId);
            }

            return currentId.ToString().PadLeft(8, '0');
        }
    }

}
